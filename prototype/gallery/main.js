import * as THREE from 'three';

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width  = canvas.clientWidth  * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({antialias: true, canvas});

    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    camera.position.z = 2;
    // camera.position.y = 1;
    // camera.rotation.x = -0.5;

    const scene = new THREE.Scene();

    
    const boxWidth = 1;
    const boxHeight = 0.84837941768907;
    const boxDepth = 0.025;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    const loader = new THREE.TextureLoader();
    const texture = loader.load( 'static/flights.png' );
    texture.colorSpace = THREE.SRGBColorSpace;
    const materials = [
        new THREE.MeshPhongMaterial({color: 0xffffff}),
        new THREE.MeshPhongMaterial({color: 0xffffff}),
        new THREE.MeshPhongMaterial({color: 0xffffff}),
        new THREE.MeshPhongMaterial({color: 0xffffff}),
        new THREE.MeshPhongMaterial({map: texture}),
        new THREE.MeshPhongMaterial({color: 0xffffff})
    ]

    const cube = new THREE.Mesh(geometry, materials);

    scene.add(cube);

    renderer.render(scene, camera);

    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    document.body.addEventListener("mouseleave", function(event){

        if(event.clientY <= 0 || event.clientX <= 0 || (event.clientX >= window.innerWidth || event.clientY >= window.innerHeight))
        {
            cube.rotation.x = 0;
            cube.rotation.y = 0;
      
        }
      });

    onmousemove = function(e){
        let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
        let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
        // console.log("mouse location:", e.clientX/vw, e.clientY/vh)

        const tiltStrength = 1.5 // Inverted, higher values are weaker

        cube.rotation.y = (e.clientX/vw-0.5)/tiltStrength
        cube.rotation.x = (e.clientY/vh-0.5)/tiltStrength
    }

    // slide("l");

    let sliding = false
    let slide_dir = "l"
    let cam_rel_x = camera.position.x
    let cam_rel_y = camera.position.y

    const slide_distance = 2
    
    function slide(direction) {
        sliding = true
        slide_dir = direction
        cam_rel_x = camera.position.x
        cam_rel_y = camera.position.y
    }

    function render(time) {
        time *= 0.001;  // convert time to seconds
    
        // cube.rotation.x = time;
        // cube.rotation.y = time;
        
        console.log(sliding)
        console.log(slide_dir)

        if (sliding == true && slide_dir == "l" && camera.position.x > cam_rel_x-(slide_distance)) {
            camera.position.x += -0.02
        } else if (sliding == true && slide_dir == "r" && camera.position.x < cam_rel_x+(slide_distance)) {
            camera.position.x += 0.02
        } else if (sliding == true && slide_dir == "l" && camera.position.x <= cam_rel_x-(slide_distance)) {
            sliding = false;
        } else if (sliding == true && slide_dir == "r" && camera.position.x >= cam_rel_x+(slide_distance)) {
            sliding = false;
        }
        
        /* RESPONSIVITY */
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        /* END RESPONSIVITY */

        renderer.render(scene, camera);
    
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    window.slide = slide;
    // return {slide: slide}
}

main();

console.log("WASSUP")