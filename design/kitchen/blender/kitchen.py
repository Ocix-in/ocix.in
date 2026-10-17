import bpy, math, sys, os
from mathutils import Vector

OUT = sys.argv[sys.argv.index("--") + 1]
os.makedirs(OUT, exist_ok=True)
QUICK = "--quick" in sys.argv
ONLY = sys.argv[sys.argv.index("--only") + 1].split(",") if "--only" in sys.argv else None

bpy.ops.wm.read_factory_settings(use_empty=True)
scn = bpy.context.scene
GROUPS = {}

def hexc(h, a=1.0):
    h = h.lstrip('#')
    r, g, b = (int(h[i:i+2], 16) / 255 for i in (0, 2, 4))
    f = lambda c: c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
    return (f(r), f(g), f(b), a)

MATS = {}
def mat(name, color, rough=0.45, metal=0.0, glass=False, emit=0.0, alpha=1.0, coat=0.25):
    if name in MATS: return MATS[name]
    m = bpy.data.materials.new(name); m.use_nodes = True
    p = m.node_tree.nodes["Principled BSDF"]
    p.inputs["Base Color"].default_value = hexc(color)
    p.inputs["Roughness"].default_value = rough
    p.inputs["Metallic"].default_value = metal
    p.inputs["Coat Weight"].default_value = coat
    p.inputs["Coat Roughness"].default_value = 0.2
    if glass:
        p.inputs["Transmission Weight"].default_value = 1.0
        p.inputs["Roughness"].default_value = 0.04
        p.inputs["IOR"].default_value = 1.45
        p.inputs["Coat Weight"].default_value = 0.0
    if emit:
        p.inputs["Emission Color"].default_value = hexc(color)
        p.inputs["Emission Strength"].default_value = emit
    if alpha < 1:
        p.inputs["Alpha"].default_value = alpha
    MATS[name] = m
    return m

def rainbow():
    if "rainbow" in MATS: return MATS["rainbow"]
    m = bpy.data.materials.new("rainbow"); m.use_nodes = True
    nt = m.node_tree; p = nt.nodes["Principled BSDF"]
    tc = nt.nodes.new("ShaderNodeTexCoord"); sub=nt.nodes.new('ShaderNodeVectorMath'); sub.operation='SUBTRACT'; sub.inputs[1].default_value=(.5,.5,.5)
    sep=nt.nodes.new('ShaderNodeSeparateXYZ'); angle=nt.nodes.new('ShaderNodeMath'); angle.operation='ARCTAN2'
    mapr=nt.nodes.new('ShaderNodeMapRange'); mapr.inputs['From Min'].default_value=-math.pi; mapr.inputs['From Max'].default_value=math.pi
    cr = nt.nodes.new("ShaderNodeValToRGB"); el = cr.color_ramp.elements
    el[0].color = hexc("2EC4B6"); el[1].color = hexc("F2A93B")
    e = el.new(0.35); e.color = hexc("7B4FD6"); e = el.new(0.68); e.color = hexc("E0457B")
    nt.links.new(tc.outputs['Generated'],sub.inputs[0]); nt.links.new(sub.outputs['Vector'],sep.inputs[0])
    nt.links.new(sep.outputs['Y'],angle.inputs[0]); nt.links.new(sep.outputs['X'],angle.inputs[1]); nt.links.new(angle.outputs[0],mapr.inputs['Value'])
    nt.links.new(mapr.outputs['Result'],cr.inputs['Fac']); nt.links.new(cr.outputs['Color'],p.inputs['Base Color'])
    p.inputs["Roughness"].default_value = 0.3; p.inputs["Coat Weight"].default_value = 0.6
    nt.links.new(cr.outputs["Color"], p.inputs["Emission Color"]); p.inputs["Emission Strength"].default_value = 0.4
    MATS["rainbow"] = m
    return m

def finish(o, m, group, bevel=0.0, segs=6, smooth=True):
    o.data.materials.append(m)
    if bevel:
        b = o.modifiers.new("b", "BEVEL"); b.width = bevel; b.segments = segs; b.limit_method = 'ANGLE'
    if smooth:
        for poly in o.data.polygons: poly.use_smooth = True
        if bevel: o.modifiers.new("wn", "WEIGHTED_NORMAL")
    GROUPS.setdefault(group, []).append(o)
    return o

def box(loc, size, m, group, bevel=0.08):
    bpy.ops.mesh.primitive_cube_add(location=loc); o = bpy.context.object
    o.scale = (size[0] / 2, size[1] / 2, size[2] / 2); bpy.ops.object.transform_apply(scale=True)
    return finish(o, m, group, bevel)

def cyl(loc, r, d, m, group, bevel=0.03, rot=(0, 0, 0), verts=64):
    bpy.ops.mesh.primitive_cylinder_add(vertices=verts, radius=r, depth=d, location=loc, rotation=rot)
    return finish(bpy.context.object, m, group, bevel)

def cone(loc, r1, r2, d, m, group, bevel=0.03):
    bpy.ops.mesh.primitive_cone_add(vertices=64, radius1=r1, radius2=r2, depth=d, location=loc)
    return finish(bpy.context.object, m, group, bevel)

def sph(loc, r, m, group, scale=(1, 1, 1), seg=48):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=seg, ring_count=seg // 2, radius=r, location=loc)
    o = bpy.context.object; o.scale = scale
    return finish(o, m, group)

def tor(loc, R, r, m, group, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_torus_add(major_radius=R, minor_radius=r, location=loc, rotation=rot, major_segments=64, minor_segments=24)
    return finish(bpy.context.object, m, group)

NAVY = mat("navy", "27245A", 0.4); DUSK = mat("dusk", "4B4878", 0.45)
CREAM = mat("cream", "FFF8EE", 0.5); WHITE = mat("white", "FFFFFF", 0.35)
TEAL = mat("teal", "2EC4B6", 0.4); VIOLET = mat("violet", "7B4FD6", 0.4)
MAG = mat("magenta", "E0457B", 0.4); AMBER = mat("amber", "F2A93B", 0.35)
STEEL = mat("steel", "D9D8E4", 0.25, metal=0.6); GLASS = mat("glass", "FFFFFF", glass=True)
FROST = mat("frost", "E8F1FF", glass=True); FROST.node_tree.nodes["Principled BSDF"].inputs["Roughness"].default_value = 0.35
# Volume steam has a soft density boundary, rather than opaque bubble outlines.
STEAM = bpy.data.materials.new("steam"); STEAM.use_nodes = True
nt = STEAM.node_tree; nt.nodes.clear()
out = nt.nodes.new('ShaderNodeOutputMaterial'); vol = nt.nodes.new('ShaderNodeVolumePrincipled')
vol.inputs['Color'].default_value = (1, 1, 1, 1)
tex = nt.nodes.new('ShaderNodeTexCoord'); dist = nt.nodes.new('ShaderNodeVectorMath'); dist.operation = 'DISTANCE'; dist.inputs[1].default_value = (.5,.5,.5)
ramp = nt.nodes.new('ShaderNodeMapRange'); ramp.inputs['From Min'].default_value = .1; ramp.inputs['From Max'].default_value = .5; ramp.inputs['To Min'].default_value = .45; ramp.inputs['To Max'].default_value = 0
nt.links.new(tex.outputs['Generated'], dist.inputs[0]); nt.links.new(dist.outputs['Value'], ramp.inputs['Value']); nt.links.new(ramp.outputs['Result'], vol.inputs['Density']); nt.links.new(vol.outputs['Volume'], out.inputs['Volume'])
EYE = mat("eye", "2EC4B6", 0.2, emit=6.0); VISOR = mat("visor", "1B1940", 0.08, coat=1.0)
DOUGH = mat("dough", "F6E3C0", 0.7, coat=0); FLAME = mat("flame", "F2A93B", 0.5, emit=3.0)
FOOD = mat("food", "E8873A", 0.5)

CT = 1.0  # counter top height

# Counter
box((0.2, 0, CT / 2), (7.0, 1.3, CT), CREAM, "counter", 0.06)
box((0.2, -0.66, 0.06), (7.0, 0.04, 0.12), NAVY, "counter", 0.01)
for x in (-2.4, -0.6, 1.2, 3.0):
    cyl((x, -0.68, 0.72), 0.035, 0.7, NAVY, "counter", 0.015, rot=(0, math.pi / 2, 0))
    box((x, -0.655, 0.45), (1.6, 0.01, 0.006), DUSK, "counter", 0)

# Fridge
# Hollow cabinet: shelves must not be buried inside a solid opaque box.
box((-4.15,.61,1.35),(1.35,.14,2.7),NAVY,'fridge',.10)
for x in (-4.76,-3.54): box((x,0,1.35),(.13,1.25,2.7),NAVY,'fridge',.06)
for z in (.07,2.63): box((-4.15,0,z),(1.35,1.25,.14),NAVY,'fridge',.06)
box((-4.15, -0.6, 1.62), (1.08, 0.06, 1.9), FROST, "fridge", 0.05)
box((-4.15, -0.6, 0.35), (1.08, 0.04, 0.42), DUSK, "fridge", 0.04)
cyl((-3.68, -0.68, 1.62), 0.04, 1.0, AMBER, "fridge", 0.02)
for i, (c, z) in enumerate([(TEAL, 1.0), (MAG, 1.05), (AMBER, 1.6), (VIOLET, 2.15), (CREAM, 2.1)]):
    box((-4.45 + (i % 3) * 0.28, -0.35, z), (0.22, 0.3, 0.26 + 0.05 * i), c, "fridge", 0.05)

# Visible shelves behind the frosted door.
for z in (.85, 1.45, 2.0):
    box((-4.15, -.18, z), (1.03, .72, .035), CREAM, "fridge", .015)

# Stove top + burners
box((0.3, -0.05, CT + 0.03), (3.4, 1.0, 0.06), NAVY, "stove", 0.02)
for x, grp in ((-0.75, "pot"), (0.35, "dough"), (1.4, "popcorn")):
    tor((x, -0.05, CT + 0.07), 0.3, 0.025, FLAME, grp)
    tor((x, -0.05, CT + 0.07), 0.18, 0.02, rainbow(), grp)

# Pot (DraftShield) — simmering
cyl((-0.75, -0.05, CT + 0.36), 0.46, 0.56, NAVY, "pot", 0.04)
tor((-0.75, -0.05, CT + 0.64), 0.46, 0.03, DUSK, "pot")
for s in (-1, 1):
    box((-0.75 + s * 0.53, -0.05, CT + 0.52), (0.18, 0.12, 0.08), DUSK, "pot", 0.03)
lid = sph((-0.75, -0.05, CT + 0.72), 0.48, DUSK, "pot-lid", scale=(1, 1, 0.22))
lid.rotation_euler = (0.0, math.radians(-9), 0)
sph((-0.82, -0.05, CT + 0.84), 0.07, AMBER, "pot-lid")
for i, (dx, dz, r) in enumerate([(0.32, 0.95, 0.13), (0.42, 1.18, 0.17), (0.3, 1.45, 0.2), (0.45, 1.75, 0.15),
                                  (0.12, 1.05, 0.1), (0.05, 1.3, 0.14), (0.15, 1.6, 0.12)]):
    sph((-0.75 + dx, -0.05, CT + dz), r, STEAM, "steam")

# Dough bowl (GymX) — proving
cone((0.35, -0.05, CT + 0.26), 0.26, 0.44, 0.38, TEAL, "dough", 0.03)
sph((0.35, -0.05, CT + 0.46), 0.42, DOUGH, "dough-rise", scale=(1, 1, 0.55))
# A continuous draped cloth, with folds and a rounded hem.
verts, faces = [], []; N = 36
for j in range(N+1):
    for i in range(N+1):
        x=(i/N-.5)*.92; y=(j/N-.5)*.82
        z=CT+.73-.25*((x*x+y*y)**.5/.5)**2+.012*math.sin(x*38)*abs(y/.44)
        verts.append((.35+x,-.05+y,z))
for j in range(N):
    for i in range(N):
        a=j*(N+1)+i; faces.append((a,a+1,a+N+2,a+N+1))
mesh=bpy.data.meshes.new('draped linen'); mesh.from_pydata(verts,[],faces); mesh.update()
cloth=bpy.data.objects.new('soft cloth',mesh); scn.collection.objects.link(cloth)
finish(cloth,MAG,'dough-rise'); sol=cloth.modifiers.new('cloth thickness','SOLIDIFY'); sol.thickness=.012
sub=cloth.modifiers.new('soft folds','SUBSURF'); sub.levels=2

# Popcorn pan (Do It!)
cyl((1.4, -0.05, CT + 0.15), 0.38, 0.14, VIOLET, "popcorn", 0.03)
cyl((1.98, -0.05, CT + 0.2), 0.045, 0.6, NAVY, "popcorn", 0.02, rot=(0, math.pi / 2 - 0.15, 0))
import random
random.seed(7)
for i in range(22):
    a = random.random() * math.tau; rr = random.random() * 0.3
    z = CT + 0.24 + random.random() * 0.08 if i < 15 else CT + 0.45 + random.random() * 0.6
    x = 1.4 + math.cos(a) * rr + (random.random() - 0.5) * (0.4 if i >= 15 else 0)
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=0.06 + random.random() * 0.03,
                                          location=(x, -0.05 + math.sin(a) * rr * 0.6, z))
    o = bpy.context.object; o.scale = (1, 0.9, 0.8 + random.random() * 0.3)
    o.rotation_euler = (random.random() * 3, random.random() * 3, 0)
    finish(o, CREAM, "popcorn-kernels", smooth=True)

# Served dish (Vigilante) under a glass cloche
cyl((3.0, -0.05, CT + 0.03), 0.62, 0.05, WHITE, "cloche", 0.02)
cyl((3.0, -0.05, CT + 0.07), 0.5, 0.04, WHITE, "cloche", 0.02)
sph((3.0, -0.05, CT + 0.17), 0.24, FOOD, "cloche", scale=(1.2, 1.2, 0.6))
for dx, dy, c in ((0.12, -0.15, TEAL), (-0.15, -0.12, TEAL), (0.0, -0.22, MAG), (0.2, 0.05, VIOLET)):
    sph((3.0 + dx, -0.05 + dy, CT + 0.27), 0.05, c, "cloche")
bpy.ops.mesh.primitive_uv_sphere_add(segments=64, ring_count=32, radius=0.55, location=(3.0, -0.05, CT + 0.09))
dome = bpy.context.object
bpy.ops.object.mode_set(mode='EDIT'); import bmesh
bm = bmesh.from_edit_mesh(dome.data)
bmesh.ops.delete(bm, geom=[v for v in bm.verts if v.co.z < -0.001], context='VERTS')
bmesh.update_edit_mesh(dome.data); bpy.ops.object.mode_set(mode='OBJECT')
dome.scale = (1, 1, 0.92)
sol = dome.modifiers.new("s", "SOLIDIFY"); sol.thickness = 0.015
finish(dome, GLASS, "cloche-dome")
sph((3.0, -0.05, CT + 0.62), 0.07, AMBER, "cloche-dome")
bpy.ops.object.light_add(type='POINT', location=(3.0, -0.05, CT + 0.35))
gl = bpy.context.object; gl.data.energy = 25; gl.data.color = (1.0, 0.75, 0.45); gl.data.shadow_soft_size = 0.2
GROUPS.setdefault("cloche", []).append(gl)

# Chef bot (OCIX)
CX, CY = -2.15, 0.75
cone((CX, CY, CT + 0.35), 0.42, 0.34, 0.9, CREAM, "chef", 0.08)
box((CX, CY - 0.36, CT + 0.25), (0.5, 0.04, 0.55), NAVY, "chef", 0.03)
sph((CX, CY, CT + 1.18), 0.44, WHITE, "chef-head", scale=(1.08, 1, 0.95))
sph((CX, CY - 0.27, CT + 1.17), 0.34, VISOR, "chef-head", scale=(1.05, 0.7, 0.62))
for s in (-1, 1):
    sph((CX + s * 0.13, CY - 0.5, CT + 1.2), 0.06, EYE, "chef-head", scale=(1, 0.6, 1.25))
    sph((CX + s * 0.47, CY, CT + 1.18), 0.07, AMBER, "chef-head")
cyl((CX, CY, CT + 1.63), 0.3, 0.28, WHITE, "chef-head", 0.04)
for dx, dy, dz, r in ((0, 0, 1.9, 0.3), (-0.22, 0, 1.84, 0.24), (0.22, 0, 1.84, 0.24), (0, -0.15, 1.86, 0.24)):
    sph((CX + dx, CY + dy, CT + dz), r, WHITE, "chef-head")
tor((CX, CY - 0.31, CT + 1.62), 0.09, 0.03, rainbow(), "chef-head", rot=(math.pi / 2, 0, 0))
# Four-colour embroidered ring on the apron, matching the hat badge.
tor((CX, CY-.39, CT+.30), .10, .022, rainbow(), "chef", rot=(math.pi/2,0,0))
# arm reaching to the pot with a spoon
arm = cyl((CX + 0.62, CY - 0.35, CT + 0.62), 0.07, 0.75, CREAM, "chef", 0.03)
arm.rotation_euler = (math.radians(35), math.radians(60), 0)
sph((CX + 0.95, CY - 0.6, CT + 0.82), 0.1, WHITE, "chef")
spoon = cyl((-1.05, CY - 0.75, CT + 0.95), 0.025, 0.9, AMBER, "chef", 0.01)
spoon.rotation_euler = (math.radians(30), math.radians(35), 0)

# Glass shelf with spice jars
box((2.3, 0.35, CT + 1.75), (2.6, 0.5, 0.05), FROST, "shelf", 0.02)
for i, c in enumerate((TEAL, VIOLET, MAG, AMBER, TEAL, MAG)):
    x = 1.25 + i * 0.42
    cyl((x, 0.35, CT + 1.94), 0.13, 0.32, GLASS, "shelf", 0.02)
    cyl((x, 0.35, CT + 1.9), 0.11, 0.22, c, "shelf", 0.02)
    cyl((x, 0.35, CT + 2.13), 0.14, 0.07, CREAM, "shelf", 0.02)

# No catcher plane: contact shadows are radial CSS ellipses. A transparent
# floor avoids the hard rectangular shadow seam at any responsive width.
# Lights
def area(loc, energy, size, color=(1, 1, 1)):
    bpy.ops.object.light_add(type='AREA', location=loc); l = bpy.context.object
    l.data.energy = energy; l.data.size = size; l.data.color = color
    d = Vector((0.3, 0, 1.2)) - l.location; l.rotation_euler = d.to_track_quat('-Z', 'Y').to_euler()
area((-5, -6, 8), 2600, 7, (1.0, 0.96, 0.92))
area((7, -5, 4), 900, 6, (0.88, 0.9, 1.0))
area((0, 6, 6), 700, 6, (1.0, 0.85, 0.95))
w = bpy.data.worlds.new("w"); scn.world = w; w.use_nodes = True
w.node_tree.nodes["Background"].inputs["Color"].default_value = hexc("EEEAF5")
w.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.7

# Render settings
scn.render.engine = 'CYCLES'
prefs = bpy.context.preferences.addons["cycles"].preferences
try:
    prefs.compute_device_type = 'METAL'; prefs.get_devices()
    for d in prefs.devices: d.use = True
    scn.cycles.device = 'GPU'
except Exception as e:
    print("GPU fallback", e)
scn.cycles.samples = 24 if QUICK else 64
scn.cycles.use_denoising = True
scn.render.film_transparent = True
# Let separate glass layers transmit the alpha channel for CSS compositing.
scn.cycles.film_transparent_glass = True
scn.cycles.film_transparent_roughness = .5
scn.view_settings.view_transform = 'AgX'
scn.view_settings.look = 'AgX - Punchy'
scn.render.image_settings.file_format = 'PNG'; scn.render.image_settings.color_mode = 'RGBA'

bpy.ops.object.camera_add(); cam = bpy.context.object; scn.camera = cam
cam.data.type = 'ORTHO'

def shoot(name, target, ortho, res, groups=None, tilt=74):
    if ONLY and name not in ONLY: return
    
    for g, objs in GROUPS.items():
        for o in objs: o.hide_render = groups is not None and not any(g == selected or g.startswith(selected + "-") for selected in groups)
    t = Vector(target); ang = math.radians(tilt)
    cam.location = t + Vector((0, -20 * math.sin(ang), 20 * math.cos(ang)))
    cam.rotation_euler = (ang, 0, 0)
    cam.data.ortho_scale = ortho
    scn.render.resolution_x, scn.render.resolution_y = res
    scn.render.resolution_percentage = 35 if QUICK else 100
    scn.render.filepath = os.path.join(OUT, name + ".png")
    bpy.ops.render.render(write_still=True)

# Full still, plus separately composited scene objects in the SAME camera space.
shoot("kitchen", (-0.4, 0, 1.45), 10.4, (2880, 1200))
shoot("kitchen-base", (-0.4, 0, 1.45), 10.4, (2880, 1200), groups=["counter", "stove"])
for group in ("pot", "dough", "popcorn", "cloche", "chef", "fridge", "shelf"):
    shoot("scene-"+group, (-0.4, 0, 1.45), 10.4, (2880, 1200), groups=[group]+(["steam"] if group=="pot" else []))

shots = {
    "pot": ((-.62, 0, 1.8), 2.6, (1400,1500)),
    "cloche": ((3, 0, 1.35), 2, (1400,1200)),
    "chef": ((-2.15,.75,2), 2.6, (1200,1400)),
    "dough": ((.35,0,1.45), 1.8, (1200,1200)),
    "popcorn": ((1.55,0,1.6), 2.2, (1200,1300)),
    "fridge": ((-4.15,0,1.35), 3.4, (1200,1400)),
    "shelf": ((2.3,.35,2.85), 3.2, (1400,700)),
}
for name, (target, ortho, res) in shots.items():
    shoot(name, target, ortho, res, groups=[name]+(["steam"] if name=="pot" else []))
    for part in {"pot":["pot-lid","steam"],"cloche":["cloche-dome"],"chef":["chef-head"],"dough":["dough-rise"],"popcorn":["popcorn-kernels"]}.get(name,[]):
        shoot(part, target, ortho, res, groups=[part])
    # The non-moving body, complementary to the animated transparent layers.
    if name in ("pot","cloche","chef","dough","popcorn"):
        original=GROUPS; GROUPS={g:objs for g,objs in original.items() if not g.startswith(name+'-')}
        for g,objs in original.items():
            if g not in GROUPS:
                for o in objs: o.hide_render=True
        shoot(name+"-body", target, ortho, res, groups=[name])
        GROUPS=original

# 404 variant: a small shrug, with open hands rather than a cooking spoon.
arm.rotation_euler=(math.radians(10),math.radians(72),0)
spoon.location=(CX+.78,CY-.4,CT+.72); spoon.rotation_euler=(0,math.pi/2,0); spoon.scale=(.01,.01,.01)
left=cyl((CX-.53,CY-.25,CT+.60),.07,.56,CREAM,'chef',.03)
left.rotation_euler=(math.radians(10),math.radians(-65),0)
sph((CX-.78,CY-.3,CT+.75),.11,WHITE,'chef',scale=(1.2,1,.65))
shoot('chef-shrug',(-2.15,.75,2),2.6,(1200,1400),groups=['chef'])
