/* Dimensioned spatial study, rendered only in response to user input. */
import * as THREE from './vendor/three.module.min.js';
export async function createRoom(container, status) {
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0x292b23,1); renderer.outputColorSpace = THREE.SRGBColorSpace;
  const canvas = renderer.domElement;
  canvas.tabIndex = 0; canvas.setAttribute('role','img'); canvas.setAttribute('aria-label','Interactive spatial study of the 30 by 60 foot Studio A live room, with a 30 foot cathedral ceiling. Use left and right arrow keys to rotate; Home resets the view.');
  const camera = new THREE.PerspectiveCamera(40,1,.1,400);
  const room = new THREE.Group(); scene.add(room);
  const wood = new THREE.MeshStandardMaterial({color:0x9a7950,roughness:.9});
  const beams = new THREE.MeshStandardMaterial({color:0xd1b58a,roughness:.85});
  const wall = new THREE.MeshStandardMaterial({color:0x5f6252,roughness:1,side:THREE.DoubleSide});
  const glass = new THREE.MeshStandardMaterial({color:0xd9b55d,roughness:.5,emissive:0x594220,emissiveIntensity:.5});
  function box(w,h,d,x,y,z,mat){const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);mesh.position.set(x,y,z);room.add(mesh);return mesh;}
  function beamBetween(a,b,width=.35){const direction=new THREE.Vector3().subVectors(b,a);const mesh=new THREE.Mesh(new THREE.BoxGeometry(width,direction.length(),width),beams);mesh.position.copy(a).add(b).multiplyScalar(.5);mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),direction.normalize());room.add(mesh);}
  // Feet are used as model units. Roof spring height and truss spacing are illustrative.
  box(30,.8,60,0,-.4,0,wood);
  for(let x=-14;x<=14;x+=2)box(.04,.035,60,x,.025,0,beams);
  box(.5,15,60,-15,7.5,0,wall);box(30,15,.5,0,7.5,-30,wall);
  // The front and right wall are omitted so the volume is legible as a cutaway.
  for(let z=-30;z<=30;z+=10){beamBetween(new THREE.Vector3(-15,15,z),new THREE.Vector3(0,30,z),.5);beamBetween(new THREE.Vector3(0,30,z),new THREE.Vector3(15,15,z),.5);beamBetween(new THREE.Vector3(-15,0,z),new THREE.Vector3(-15,15,z),.4);}
  beamBetween(new THREE.Vector3(0,30,-30),new THREE.Vector3(0,30,30),.45);
  beamBetween(new THREE.Vector3(15,15,-30),new THREE.Vector3(15,15,30),.4);
  for(let z=-22;z<=22;z+=11){box(.14,8,3.2,-14.68,8.5,z,glass);box(.18,.14,3.2,-14.52,8.5,z,beams);box(.18,8,.14,-14.52,8.5,z,beams);}
  box(18,5,.15,0,8,-29.65,new THREE.MeshStandardMaterial({color:0x363f38,metalness:.15,roughness:.5}));
  const outline=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(30,.1,60)),new THREE.LineBasicMaterial({color:0xe4d7be}));outline.position.y=-1.5;room.add(outline);
  scene.add(new THREE.HemisphereLight(0xfff4df,0x282c23,2.6));const key=new THREE.DirectionalLight(0xffe3ac,3);key.position.set(25,45,25);scene.add(key);const fill=new THREE.DirectionalLight(0xcbd3dc,1.5);fill.position.set(-20,30,-25);scene.add(fill);
  let angle=.72,elevation=.5,visible=true,dragging=false,startX=0,baseAngle=0,disposed=false;
  function draw(){if(disposed||!visible)return;const radius=110;camera.position.set(Math.sin(angle)*radius,14+Math.sin(elevation)*75,Math.cos(angle)*radius);camera.lookAt(0,10,0);renderer.render(scene,camera);}
  function resize(){if(disposed)return;const width=container.clientWidth,height=container.clientHeight;if(!width||!height)return;renderer.setSize(width,height,false);camera.aspect=width/height;camera.fov=width/height<1.2?52:40;camera.updateProjectionMatrix();draw();}
  function view(command){if(command==='reset'){angle=.72;elevation=.5;}else angle+=command==='left'?-.25:.25;draw();}
  canvas.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&e.button!==0)return;dragging=true;startX=e.clientX;baseAngle=angle;canvas.setPointerCapture(e.pointerId);});
  canvas.addEventListener('pointermove',e=>{if(dragging){angle=baseAngle-(e.clientX-startX)*.008;draw();}});
  const end=()=>{dragging=false;};canvas.addEventListener('pointerup',end);canvas.addEventListener('pointercancel',end);
  canvas.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home'].includes(e.key)){e.preventDefault();view(e.key==='Home'?'reset':e.key==='ArrowLeft'?'left':'right');}});
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();status.textContent='The 3D view was interrupted. Reload the page to restore it, or explore the room photographs.';});
  container.append(canvas);container.querySelector('.model-fallback').hidden=true;
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(container);
  const visibilityObserver=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting; if(visible)resize();});visibilityObserver.observe(container);
  document.addEventListener('visibilitychange',()=>{visible=!document.hidden; if(visible)draw();});
  status.textContent='Drag horizontally to rotate. Or use the arrow buttons.';resize();
  window.addEventListener('pagehide',e=>{if(e.persisted)return;disposed=true;resizeObserver.disconnect();visibilityObserver.disconnect();scene.traverse(o=>{o.geometry?.dispose();if(o.material){const materials=Array.isArray(o.material)?o.material:[o.material];materials.forEach(m=>m.dispose());}});renderer.dispose();},{once:true});
  return {view,resize};
}
