import React, {useRef, useEffect} from 'react';
import * as THREE from "three";
import OrbitControls from "three/examples/jsm/controls/OrbitControls";
import * as Ammo from "@common/ammo.js";


const Range = () => {
  const containerRef = useRef(null);


  useEffect(() => {

    // Graphics letiables
    let container;
    let camera, controls, scene, renderer;
    let textureLoader;
    let clock = new THREE.Clock();
    let clickRequest = false;
    let mouseCoords = new THREE.Vector2();
    let raycaster = new THREE.Raycaster();
    let ballMaterial = new THREE.MeshPhongMaterial({color: 0x202020});
    let pos = new THREE.Vector3();
    let quat = new THREE.Quaternion();

    // Physics letiables
    let gravityConstant = -9.8;
    let physicsWorld;
    let rigidBodies = [];
    let margin = 0.05;
    let transformAux1;

    Ammo().then(function (AmmoLib) {

      Ammo = AmmoLib;

      init();
      animate();

    });


    const initGraphics = () => {

      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.2, 2000);

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff);

      camera.position.set(-7, 5, 8);

      controls = new THREE.OrbitControls(camera);
      controls.maxPolarAngle = Math.PI * 0.495;
      controls.target.set(0, 2, 0);
      controls.minDistance = 10.0;
      controls.maxDistance = 20.0;
      controls.update();

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.enabled = true;

      textureLoader = new THREE.TextureLoader();

      let ambientLight = new THREE.AmbientLight(0x404040);
      scene.add(ambientLight);

      let light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(-10, 10, 5);
      light.castShadow = true;
      let d = 20;
      light.shadow.camera.left = -d;
      light.shadow.camera.right = d;
      light.shadow.camera.top = d;
      light.shadow.camera.bottom = -d;

      light.shadow.camera.near = 2;
      light.shadow.camera.far = 50;

      light.shadow.mapSize.x = 1024;
      light.shadow.mapSize.y = 1024;

      scene.add(light);

      container.innerHTML = '';

      container.appendChild(renderer.domElement);


      window.addEventListener('resize', onWindowResize, false);

    }

    const initPhysics = () => {

      // Physics configuration

      let collisionConfiguration = new Ammo.btSoftBodyRigidBodyCollisionConfiguration();
      let dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
      let broadphase = new Ammo.btDbvtBroadphase();
      let solver = new Ammo.btSequentialImpulseConstraintSolver();
      let softBodySolver = new Ammo.btDefaultSoftBodySolver();
      physicsWorld = new Ammo.btSoftRigidDynamicsWorld(dispatcher, broadphase, solver, collisionConfiguration, softBodySolver);
      physicsWorld.setGravity(new Ammo.btVector3(0, gravityConstant, 0));
      physicsWorld.getWorldInfo().set_m_gravity(new Ammo.btVector3(0, gravityConstant, 0));

      transformAux1 = new Ammo.btTransform();
      let softBodyHelpers = new Ammo.btSoftBodyHelpers();

    }

    const createObjects = () => {

      // Ground
      pos.set(0, -0.5, 0);
      quat.set(0, 0, 0, 1);
      let ground = createParalellepiped(40, 1, 40, 0, pos, quat, new THREE.MeshPhongMaterial({color: 0xFFFFFF}));
      ground.castShadow = true;
      ground.receiveShadow = true;

      // Ramp
      pos.set(3, 1, 0);
      quat.setFromAxisAngle(new THREE.Vector3(0, 0, 1), 30 * Math.PI / 180);
      let obstacle = createParalellepiped(10, 1, 4, 0, pos, quat, new THREE.MeshPhongMaterial({color: 0x606060}));
      obstacle.castShadow = true;
      obstacle.receiveShadow = true;

    }

    const createParalellepiped = (sx, sy, sz, mass, pos, quat, material) => {

      let threeObject = new THREE.Mesh(new THREE.BoxBufferGeometry(sx, sy, sz, 1, 1, 1), material);
      let shape = new Ammo.btBoxShape(new Ammo.btVector3(sx * 0.5, sy * 0.5, sz * 0.5));
      shape.setMargin(margin);

      createRigidBody(threeObject, shape, mass, pos, quat);

      return threeObject;

    }

    const createRigidBody = (threeObject, physicsShape, mass, pos, quat) => {

      threeObject.position.copy(pos);
      threeObject.quaternion.copy(quat);

      let transform = new Ammo.btTransform();
      transform.setIdentity();
      transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
      transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));
      let motionState = new Ammo.btDefaultMotionState(transform);

      let localInertia = new Ammo.btVector3(0, 0, 0);
      physicsShape.calculateLocalInertia(mass, localInertia);

      let rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, physicsShape, localInertia);
      let body = new Ammo.btRigidBody(rbInfo);

      threeObject.userData.physicsBody = body;

      scene.add(threeObject);

      if (mass > 0) {

        rigidBodies.push(threeObject);

        // Disable deactivation
        body.setActivationState(4);

      }

      physicsWorld.addRigidBody(body);

      return body;

    }

    const initInput = () => {

      window.addEventListener('mousedown', function (event) {

        if (!clickRequest) {

          mouseCoords.set(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1
          );

          clickRequest = true;

        }

      }, false);

    }

    const processClick = () => {

      if (clickRequest) {

        raycaster.setFromCamera(mouseCoords, camera);

        // Creates a ball
        let ballMass = 3;
        let ballRadius = 0.05;

        let ball = new THREE.Mesh(new THREE.SphereBufferGeometry(ballRadius, 18, 16), ballMaterial);
        ball.castShadow = true;
        ball.receiveShadow = true;
        let ballShape = new Ammo.btSphereShape(ballRadius);
        ballShape.setMargin(margin);
        pos.copy(raycaster.ray.direction);
        pos.add(raycaster.ray.origin);
        quat.set(0, 0, 0, 1);
        let ballBody = createRigidBody(ball, ballShape, ballMass, pos, quat);
        ballBody.setFriction(0.5);

        pos.copy(raycaster.ray.direction);
        pos.multiplyScalar(14);
        ballBody.setLinearVelocity(new Ammo.btVector3(pos.x, pos.y, pos.z));

        clickRequest = false;

      }

    }

    const onWindowResize = () => {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);

    }

    const animate = () => {

      requestAnimationFrame(animate);

      render();
    }

    const render = () => {

      let deltaTime = clock.getDelta();

      updatePhysics(deltaTime);

      processClick();

      renderer.render(scene, camera);

    }

    const updatePhysics = (deltaTime) => {

      // Step world
      physicsWorld.stepSimulation(deltaTime, 10);


      // Update rigid bodies
      for (let i = 0, il = rigidBodies.length; i < il; i++) {

        let objThree = rigidBodies[i];
        let objPhys = objThree.userData.physicsBody;
        let ms = objPhys.getMotionState();
        if (ms) {

          ms.getWorldTransform(transformAux1);
          let p = transformAux1.getOrigin();
          let q = transformAux1.getRotation();
          objThree.position.set(p.x(), p.y(), p.z());
          objThree.quaternion.set(q.x(), q.y(), q.z(), q.w());

        }

      }

    }

    const init = () => {

      initGraphics();

      initPhysics();

      createObjects();

      initInput();

    }

    init();
    animate();
  }, []);

  return <div ref={containerRef}></div>;
}

export default Range;
