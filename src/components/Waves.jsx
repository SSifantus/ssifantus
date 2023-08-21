import React, { useRef, useEffect } from 'react';
import * as THREE from "three";


const Waves = () => {
  const containerRef = useRef(null);


  useEffect(() => {
    let SEPARATION = 200, AMOUNTX = 60, AMOUNTY = 50;
    let camera, scene, renderer;
    let particles, count = 0;
    let mouseX = 0, mouseY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    const init = () => {

      camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
      camera.position.z = 1000;
      scene = new THREE.Scene();
      scene.background = new THREE.Color( 0xfefefe );
      let numParticles = AMOUNTX * AMOUNTY;
      let positions = new Float32Array( numParticles * 3 );
      let scales = new Float32Array( numParticles );
      let i = 0, j = 0;
      for ( let ix = 0; ix < AMOUNTX; ix ++ ) {
        for ( let iy = 0; iy < AMOUNTY; iy ++ ) {
          positions[ i ] = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 ); // x
          positions[ i + 1 ] = 0; // y
          positions[ i + 2 ] = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 ); // z
          scales[ j ] = 1;
          i += 3;
          j ++;
        }
      }
      const vertexshader = `
            attribute float scale;
            void main() {
                vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
                gl_PointSize = scale * ( 300.0 / - mvPosition.z );
                gl_Position = projectionMatrix * mvPosition;
            }
      `;
      const fragmentshader = `
            uniform vec3 color;
            void main() {
                if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
                gl_FragColor = vec4( color, 1.0 );
            }
      `;
      let geometry = new THREE.BufferGeometry();
      geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
      geometry.setAttribute( 'scale', new THREE.BufferAttribute( scales, 1 ) );
      let material = new THREE.ShaderMaterial( {
        uniforms: {
          color: { value: new THREE.Color( 0x666666 ) },
        },
        vertexShader: vertexshader,
        fragmentShader: fragmentshader
      } );
      //
      particles = new THREE.Points( geometry, material );
      scene.add( particles );
      //
      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      containerRef.current.appendChild(renderer.domElement);

      document.addEventListener( 'mousemove', onDocumentMouseMove, false );
      document.addEventListener( 'touchstart', onDocumentTouchStart, false );
      document.addEventListener( 'touchmove', onDocumentTouchMove, false );
      //
      window.addEventListener( 'resize', onWindowResize, false );
    }
    const onWindowResize = () => {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    }
    //
    const onDocumentMouseMove = ( event ) => {
      mouseX = event.clientX - windowHalfX;
      mouseY = event.clientY - windowHalfY;
    }
    const onDocumentTouchStart = ( event ) => {
      if ( event.touches.length === 1 ) {
        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;
      }
    }
    const onDocumentTouchMove = ( event ) => {
      if ( event.touches.length === 1 ) {
        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;
      }
    }
    //
    const animate = () => {
      requestAnimationFrame( animate );
      render();
    }
    const render = () => {
      camera.position.x += ( mouseX - camera.position.x ) * .05;
      camera.position.y += ( - mouseY - camera.position.y ) * .05;
      camera.lookAt( scene.position );
      let positions = particles.geometry.attributes.position.array;
      let scales = particles.geometry.attributes.scale.array;
      let i = 0, j = 0;
      for ( let ix = 0; ix < AMOUNTX; ix ++ ) {
        for ( let iy = 0; iy < AMOUNTY; iy ++ ) {
          positions[ i + 1 ] = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) +
            ( Math.sin( ( iy + count ) * 0.5 ) * 50 );
          scales[ j ] = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 8 +
            ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 8;
          i += 3;
          j ++;
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;
      particles.geometry.attributes.scale.needsUpdate = true;
      renderer.render( scene, camera );
      count += 0.1;
    }

    init();
    animate();
  }, []);

  return <div ref={containerRef}></div>;
}

export default Waves;
