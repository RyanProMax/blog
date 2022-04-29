import { ref } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { unrefElement } from '@vueuse/core';

// types
import type { MaybeElementRef } from '@vueuse/core';

// assets
import CHINA_GEO_DATA from '~/assets/geojson/china.geo.json';
import WORLD_GEO_DATA from '~/assets/geojson/world.geo';

// constant
const EARTH_CONFIG = {
  RADIUS: 25,
  WORLD_GEO_DATA,
  CHINA_GEO_DATA,
  ROTATE_SPEED: 0.005,
  COLOR_BASE: 0x145B7D,
  COLOR_CHINA: '#00aaaa'
};

const GALAXY_CONFIG = {
  RADIUS: 800,
  STARS: 3000
};

const MEW_CONFIG = {
  DISTANCE: -250
};

const CAMERA_CONFIG = {
  DISTANCE: -300,
  ROTATE_SPEED: 0.1
};

const MAP = {
  SHENZHEN: { longitude: 114.085947, latitude: 22.547 },
  NANCHONG: { longitude: 106.108996, latitude: 30.781809 },
  SHANGHAI: { longitude: 121.567706, latitude: 31.245944 },
  QINGHAI: { longitude: 101.796095, latitude: 36.616043 },
  GANSU: { longitude: 100.455472, latitude: 38.932897 }
};

const MARK_POINTS = {
  SIZE: 1,
  PILLAR_HEIGHT: 3,
  OPACITY: 0.8,
  PILLAR_OPACITY: 0.3,
  color: 'deepskyblue',
  DATA: [MAP.SHENZHEN, MAP.NANCHONG, MAP.SHANGHAI, MAP.QINGHAI, MAP.GANSU]
};

const FLY_LINES = {
  DATA: [
    { start: MAP.SHENZHEN, stop: MAP.SHANGHAI },
    { start: MAP.SHENZHEN, stop: MAP.NANCHONG },
    { start: MAP.SHENZHEN, stop: MAP.QINGHAI },
    { start: MAP.SHENZHEN, stop: MAP.GANSU }
  ],
  LINE_COLOR: '#afdfe4',
  POINT_SIZE: 0.15,
  POINT_COLOR: '#00aaaa',
  POINT_SPEED: 0.005
};

// method
function formatCoordinate(type: string, coordinates: number[][][] | number[][][][]) {
  return type === 'Polygon' ? [coordinates] as number[][][][] : coordinates as number[][][][];
}

function line(points: number[], color: string | number) {
  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array(points);
  const attribue = new THREE.BufferAttribute(vertices, 3);
  geometry.attributes.position = attribue;
  const material = new THREE.LineBasicMaterial({
    color
  });
  const line = new THREE.LineLoop(geometry, material);
  return line;
}

function renderCoordsLine(radius: number, coordinates: number[][][][], color: number | string, offsetY = 0) {
  const group = new THREE.Group();
  coordinates.forEach((polygon) => {
    const points: number[] = [];
    polygon[0].forEach((coordinate) => {
      const { x, y, z } = coordinate2xyz(radius, coordinate[0], coordinate[1]);
      points.push(x, y + offsetY, z);
    });
    group.add(line(points, color));
  });
  return group;
}

// 经纬度转三维坐标
function coordinate2xyz(radius: number, longitude: number, latitude: number) {
  const lon = (longitude * Math.PI) / 180;
  const lat = (latitude * Math.PI) / 180;
  const x = radius * Math.cos(lat) * Math.sin(lon);
  const y = radius * Math.sin(lat);
  const z = radius * Math.cos(lon) * Math.cos(lat);
  return { x, y, z };
}

export const initialUniverse = async(target: MaybeElementRef) => {
  const flyLinePointCoefficient = ref(0);
  const container = unrefElement(target)!;
  const { clientWidth, clientHeight } = container;
  if (!clientWidth || !clientHeight)
    return;

  // renderer
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(clientWidth, clientHeight);
  container.appendChild(renderer.domElement);

  // camera
  const camera = new THREE.PerspectiveCamera(75, clientWidth / clientHeight, 1, GALAXY_CONFIG.RADIUS * 2);
  camera.position.set(-15, 20, CAMERA_CONFIG.DISTANCE);
  camera.lookAt(0, 0, 0);

  // scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x020924);
  scene.fog = new THREE.Fog(0x999999, GALAXY_CONFIG.RADIUS, GALAXY_CONFIG.RADIUS * 3);

  // control
  const control = new OrbitControls(camera, renderer.domElement);
  control.enableDamping = true;
  control.enableZoom = true;
  control.autoRotate = true;
  control.autoRotateSpeed = CAMERA_CONFIG.ROTATE_SPEED;
  // 禁止平移
  control.enablePan = false;
  control.maxDistance = GALAXY_CONFIG.RADIUS - 200;

  // light
  scene.add(new THREE.AmbientLight(0xFFFFFF, 0.3));
  const light = new THREE.DirectionalLight(0xFFFFFF, 0.8 * Math.PI);
  light.position.set(0, 50, 0);
  scene.add(light);

  // galaxy
  const textureLoader = new THREE.TextureLoader();
  // 星系球体
  const galaxyGeometry = new THREE.SphereGeometry(GALAXY_CONFIG.RADIUS, 50, 50);
  // 反转，纹理转为内部
  galaxyGeometry.scale(1, 1, -1);
  // 纹理
  textureLoader.load('/texture/galaxy.jfif', (texture) => {
    const galaxyMaterial = new THREE.MeshBasicMaterial({ map: texture });

    const galaxy = new THREE.Mesh(galaxyGeometry, galaxyMaterial);
    scene.add(galaxy);
  });

  // stars
  const positions = [];
  const colors = [];
  const geometry = new THREE.BufferGeometry();
  for (let i = 0; i < GALAXY_CONFIG.STARS; i++) {
    const vertex = new THREE.Vector3();
    vertex.x = Math.random() * 2 - 1;
    vertex.y = Math.random() * 2 - 1;
    vertex.z = Math.random() * 2 - 1;
    positions.push(vertex.x, vertex.y, vertex.z);
    const color = new THREE.Color();
    color.setHSL(Math.random() * 0.2 + 0.5, 0.55, Math.random() * 0.25 + 0.55);
    colors.push(color.r, color.g, color.b);
  }
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  const starsMaterial = new THREE.PointsMaterial({
    map: textureLoader.load('/texture/star.png'),
    size: 1,
    transparent: true,
    opacity: 1,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  });

  const stars = new THREE.Points(geometry, starsMaterial);
  stars.scale.set(500, 500, 500);

  scene.add(stars);

  // render Earth
  const group = new THREE.Group();
  const earthGeometry = new THREE.SphereGeometry(EARTH_CONFIG.RADIUS, 50, 50);
  const earthMaterial = new THREE.MeshBasicMaterial({
    color: 0x020924,
    transparent: true,
    opacity: 0.8
  });
  const earth = new THREE.Mesh(earthGeometry, earthMaterial);
  group.add(earth);

  // render world
  for (const country of EARTH_CONFIG.WORLD_GEO_DATA.features) {
    if (country.id === 'CHN')
      continue;
    const { type, coordinates } = country.geometry;
    const _coordinates = formatCoordinate(type, coordinates);
    const line = renderCoordsLine(EARTH_CONFIG.RADIUS, _coordinates, EARTH_CONFIG.COLOR_BASE);
    group.add(line);
  }

  // render china
  EARTH_CONFIG.CHINA_GEO_DATA.features.forEach((country) => {
    const { type, coordinates } = country.geometry;
    const _coordinates = formatCoordinate(type, coordinates);
    const line = renderCoordsLine(EARTH_CONFIG.RADIUS, _coordinates, EARTH_CONFIG.COLOR_CHINA);
    group.add(line);
  });

  scene.add(group);

  // 绘制梦幻
  const loader = new FBXLoader();
  const mesh: any = await loader.loadAsync('/model/mew_fly.fbx');
  const scale = 2;
  mesh.scale.set(scale, scale, scale);
  mesh.position.set(0, 0, MEW_CONFIG.DISTANCE);
  scene.add(mesh);

  const mew = mesh;

  const mixer = (mesh.mixer = new THREE.AnimationMixer(mesh));
  const AnimationAction = mixer.clipAction(mesh.animations[0]);
  AnimationAction.play();

  // 描点
  function spot(point: { longitude: number; latitude: number },
    { x, y, z }: { x: number; y: number; z: number }) {
    const { color, SIZE, OPACITY } = { ...MARK_POINTS, ...point };
    const texture = textureLoader.load('/texture/point.png');
    const geometry = new THREE.PlaneBufferGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      color,
      transparent: true,
      opacity: OPACITY
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(SIZE, SIZE, SIZE);
    mesh.position.set(x, y, z);
    // 偏移校正
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), new THREE.Vector3(x, y, z).normalize());
    return mesh;
  }

  // 初始化描点
  const points = MARK_POINTS.DATA.map((point) => {
    const { longitude, latitude } = point;
    const { x, y, z } = coordinate2xyz(EARTH_CONFIG.RADIUS * 1.001, longitude, latitude);
    return [spot(point, { x, y, z })];
  });
  group.add(...points.flat(1));

  // 飞线
  function calculateBezierCoord(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number) {
    const [tmpx, tmpy, tmpz] = [x1 + x2, y1 + y2, z1 + z2];
    const x = (tmpx * 5) / 17 + x1 / 2;
    const y = (tmpy * 5) / 17 + y1 / 2;
    const z = (tmpz * 5) / 17 + z1 / 2;
    return { x, y, z };
  }

  const { POINT_SIZE, POINT_COLOR, LINE_COLOR } = FLY_LINES;

  const lines = FLY_LINES.DATA.map(({ start, stop }) => {
    const { x: v0x, y: v0y, z: v0z } = coordinate2xyz(EARTH_CONFIG.RADIUS * 1.001, start.longitude, start.latitude);
    const { x: v3x, y: v3y, z: v3z } = coordinate2xyz(EARTH_CONFIG.RADIUS * 1.001, stop.longitude, stop.latitude);

    const v0 = new THREE.Vector3(v0x, v0y, v0z);
    const v3 = new THREE.Vector3(v3x, v3y, v3z);
    const { x: x1, y: y1, z: z1 } = calculateBezierCoord(v0x, v0y, v0z, v3x, v3y, v3z);
    const { x: x2, y: y2, z: z2 } = calculateBezierCoord(v3x, v3y, v3z, v0x, v0y, v0z);
    const v1 = new THREE.Vector3(x1, y1, z1);
    const v2 = new THREE.Vector3(x2, y2, z2);

    const curve = new THREE.CubicBezierCurve3(v0, v1, v2, v3);
    const points = curve.getPoints(50);

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineBasicMaterial({ color: LINE_COLOR });

    return {
      point: new THREE.Mesh(new THREE.SphereGeometry(POINT_SIZE, 10, 10), new THREE.PointsMaterial({ color: POINT_COLOR, transparent: true, opacity: 0.8 })),
      curve,
      line: new THREE.Line(geometry, material)
    };
  });

  const flyLine = lines;
  group.add(...lines.map(x => x.line), ...lines.map(x => x.point));

  // render
  const clock = new THREE.Clock();
  renderer.setAnimationLoop(() => {
    if (mew && mew.mixer)
      mew.mixer.update(clock.getDelta());

    if (flyLine && flyLine.length) {
      if (flyLinePointCoefficient.value >= 1)
        flyLinePointCoefficient.value = 0;
      flyLine.forEach(({ curve, point }) => {
        const { x, y, z } = curve.getPointAt(flyLinePointCoefficient.value);
        point.position.set(x, y, z);
      });

      flyLinePointCoefficient.value += FLY_LINES.POINT_SPEED;
    }

    group && group.rotateY(EARTH_CONFIG.ROTATE_SPEED);
    control && control.update();
    renderer.render(scene, camera);
  });

  return { clientWidth, clientHeight, camera, renderer };
};
