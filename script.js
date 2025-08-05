// AC Training Unit Configuration
const CONFIG = {
  // Current state tracking
  currentModel: '',
  currentLanguage: 'bm', // bm or eng
  currentModule: 'airflow', // airflow or problem
  currentComponent: null,
  isModelLoaded: false,
  
  // Component definitions for the AC unit
  components: {
    compressor: {
      position: {x: -0.5, y: -0.3, z: -0.2},
      label: {
        bm: 'Kompressor',
        eng: 'Compressor'
      },
      info: {
        bm: 'Komponen yang memampatkan refrigeran bersuhu rendah dan tekanan rendah menjadi refrigeran bersuhu tinggi dan tekanan tinggi.',
        eng: 'Component that compresses low-temperature and low-pressure refrigerant into high-temperature and high-pressure refrigerant.'
      },
      step: {
        title: {
          bm: 'Langkah 1: Kompressor',
          eng: 'Step 1: Compressor'
        },
        details: [
          {
            bm: 'Menyedut refrigerant dalam bentuk gas bertekanan rendah.',
            eng: 'Sucks refrigerant in low-pressure gas form.'
          },
          {
            bm: 'Memampatkan gas tersebut menjadi gas tekanan tinggi dan bersuhu tinggi.',
            eng: 'Compresses the gas into high-pressure, high-temperature gas.'
          }
        ]
      }
    },
    condenser: {
      position: {x: 0.5, y: 0.3, z: -0.2},
      label: {
        bm: 'Kondenser',
        eng: 'Condenser'
      },
      info: {
        bm: 'Menukar haba dari refrigeran ke udara sekitar. Refrigeran berubah dari gas tekanan tinggi ke cecair tekanan tinggi.',
        eng: 'Exchanges heat from refrigerant to surrounding air. Refrigerant changes from high-pressure gas to high-pressure liquid.'
      },
      step: {
        title: {
          bm: 'Langkah 2: Kondenser',
          eng: 'Step 2: Condenser'
        },
        details: [
          {
            bm: 'Menerima gas tekanan tinggi dan suhu tinggi dari kompresor.',
            eng: 'Receives high-pressure, high-temperature gas from the compressor.'
          },
          {
            bm: 'Melepaskan haba ke udara sekitar, menyejukkan refrigeran menjadi cecair.',
            eng: 'Releases heat to surrounding air, cooling the refrigerant into liquid.'
          }
        ]
      }
    },
    evaporator: {
      position: {x: 0, y: -0.2, z: 0.3},
      label: {
        bm: 'Evaporator',
        eng: 'Evaporator'
      },
      info: {
        bm: 'Menyerap haba dari ruangan yang ingin disejukkan, mengubah refrigeran dari bentuk cecair ke gas.',
        eng: 'Absorbs heat from the space to be cooled, converting refrigerant from liquid to gas.'
      },
      step: {
        title: {
          bm: 'Langkah 3: Evaporator',
          eng: 'Step 3: Evaporator'
        },
        details: [
          {
            bm: 'Cecair refrigeran bersuhu rendah mengalir melalui evaporator.',
            eng: 'Low-temperature refrigerant liquid flows through the evaporator.'
          },
          {
            bm: 'Menyerap haba dari udara, menyejukkan udara dan mengubah refrigeran menjadi gas.',
            eng: 'Absorbs heat from the air, cooling the air and converting refrigerant into gas.'
          }
        ]
      }
    }
  },
  
  // Airflow paths for animation
  airflowPaths: {
    normal: [
      {
        type: 'blue', // cool, low-pressure gas
        from: 'evaporator',
        to: 'compressor',
        points: []
      },
      {
        type: 'red', // hot, high-pressure gas
        from: 'compressor',
        to: 'condenser',
        points: []
      },
      {
        type: 'orange', // medium pressure liquid
        from: 'condenser',
        to: 'evaporator',
        points: []
      }
    ],
    faulty: [
      {
        type: 'blue', // cool, low-pressure gas
        from: 'evaporator',
        to: 'compressor',
        points: []
      },
      {
        type: 'red', // hot, high-pressure gas
        from: 'compressor',
        to: 'condenser',
        points: [] 
      }
      // Note: Intentionally no orange arrow from condenser to evaporator to show blockage
    ]
  },
  
  // Fault definitions
  faults: {
    condenser_blocked: {
      id: 'condenser_blocked',
      title: {
        bm: 'Kondenser Tersumbat / Kotor',
        eng: 'Condenser Blocked / Dirty'
      },
      problem: {
        bm: 'Masalah: Kondenser Tersumbat / Kotor',
        eng: 'Problem: Condenser Blocked / Dirty'
      },
      effect: {
        bm: 'Kesan: Tekanan dalam sistem naik terlalu tinggi -> risiko meletup atau bocor. Udara yang keluar tidak cukup sejuk, beban kerja pada compressor bertambah -> lebih cepat rosak.',
        eng: 'Effect: System pressure increases -> risk of explosion or leakage. Air output not cold enough, compressor works harder -> premature failure.'
      },
      simulation: {
        bm: 'Simulasi: Haba bertambah di Condenser',
        eng: 'Simulation: Heat accumulation in the condenser'
      },
      description: {
        bm: 'Haba dari refrigerant tidak dapat dibuang. Gas panas dari compressor tidak dapat menjadi cecair sepenuhnya.',
        eng: 'Heat from refrigerant cannot be released. Hot gas from compressor cannot fully convert to liquid.'
      },
      affectedComponent: 'condenser'
    },
    compressor_failure: {
      id: 'compressor_failure',
      title: {
        bm: 'Compressor Tidak Berfungsi',
        eng: 'Compressor Failure'
      },
      problem: {
        bm: 'Masalah: Compressor Tidak Berfungsi',
        eng: 'Problem: Compressor Failure'
      },
      description: {
        bm: 'Compressor tidak dapat memampatkan refrigerant, menyebabkan sistem tidak berfungsi dengan baik.',
        eng: 'Compressor unable to compress refrigerant, causing system malfunction.'
      },
      affectedComponent: 'compressor'
    },
    expansion_valve_blocked: {
      id: 'expansion_valve_blocked',
      title: {
        bm: 'Expansion Valve (TXV) Tersumbat',
        eng: 'Expansion Valve (TXV) Blocked'
      },
      problem: {
        bm: 'Masalah: Expansion Valve (TXV) Tersumbat',
        eng: 'Problem: Expansion Valve (TXV) Blocked'
      },
      description: {
        bm: 'Valve tersumbat menyebabkan aliran refrigerant terhalang.',
        eng: 'Blocked valve restricts refrigerant flow.'
      },
      affectedComponent: 'expansion_valve'
    },
    low_refrigerant: {
      id: 'low_refrigerant',
      title: {
        bm: 'Refrigerant Terlalu Rendah',
        eng: 'Low Refrigerant'
      },
      problem: {
        bm: 'Masalah: Refrigerant Terlalu Rendah',
        eng: 'Problem: Low Refrigerant'
      },
      description: {
        bm: 'Tahap refrigerant rendah disebabkan kebocoran, menyebabkan penyejukan tidak efektif.',
        eng: 'Low refrigerant level due to leakage, causing ineffective cooling.'
      },
      affectedComponent: 'system'
    },
    frozen_evaporator: {
      id: 'frozen_evaporator',
      title: {
        bm: 'Evaporator Beku',
        eng: 'Frozen Evaporator'
      },
      problem: {
        bm: 'Masalah: Evaporator Beku',
        eng: 'Problem: Frozen Evaporator'
      },
      description: {
        bm: 'Evaporator membeku disebabkan oleh aliran udara terhalang atau masalah sistem.',
        eng: 'Evaporator frozen due to restricted airflow or system issues.'
      },
      affectedComponent: 'evaporator'
    }
  }
};

// Function to load a specific model
function loadModel(modelFile) {
  console.log(`Loading model: ${modelFile}`);
  
  // Update current model tracking
  CONFIG.currentModel = modelFile;
  
  // Switch to AR screen first
  document.getElementById('selection-screen').classList.remove('active');
  document.getElementById('ar-screen').classList.add('active');
  
  // Set the model source in the asset
  const modelAsset = document.getElementById('model-asset');
  modelAsset.setAttribute('src', modelFile);
  
  // Wait for asset to load then apply to model
  modelAsset.addEventListener('loaded', function() {
    console.log('Model asset loaded successfully');
    applyModelToScene(modelFile);
  }, { once: true });
  
  modelAsset.addEventListener('error', function(e) {
    console.error('Error loading model asset:', e);
    alert('Error loading 3D model. Please try again.');
  }, { once: true });
  
  // Update page title
  const title = modelFile === 'model.glb' ? 'Normal Airflow' : 'Faulty Airflow';
  document.title = title + ' - AR AC Training Unit';
  
  // Make step instructions visible
  document.getElementById('step-instructions').classList.remove('hidden');
}

// Function to actually apply the model to the scene
function applyModelToScene(modelFile) {
  // Get model entity
  const model = document.getElementById('model');
  
  // Remove existing model if any
  if (model.getAttribute('gltf-model')) {
    model.removeAttribute('gltf-model');
  }
  
  // Apply the model after a short delay (helps with rendering)
  setTimeout(() => {
    model.setAttribute('gltf-model', '#model-asset');
    
    // Set model scale and position based on which model is loaded
    if (modelFile === 'model.glb') {
      model.setAttribute('scale', '1 1 1');
      model.setAttribute('position', '0 0 0');
    } else if (modelFile === 'acc4.glb') {
      model.setAttribute('scale', '1 1 1'); 
      model.setAttribute('position', '0 0 0');
    }
    
    // Mark as loaded
    CONFIG.isModelLoaded = true;
    console.log('Model applied to scene');
    
    // Setup components and labels
    setupComponentLabels();
    
    // Create airflow arrows
    createAirflowArrows(modelFile === 'model.glb' ? 'normal' : 'faulty');
    
    // Update UI
    updateUILanguage();
    showComponentInfo('compressor'); // Show first component by default
  }, 300);
}

// Set up component labels in 3D space
function setupComponentLabels() {
  // Get labels container
  const labelsContainer = document.getElementById('labels-container');
  
  // Clear existing labels
  while (labelsContainer.firstChild) {
    labelsContainer.removeChild(labelsContainer.firstChild);
  }
  
  // Create labels for each component
  Object.keys(CONFIG.components).forEach(componentId => {
    const component = CONFIG.components[componentId];
    
    // Create the label entity
    const label = document.createElement('a-entity');
    label.setAttribute('id', `label-${componentId}`);
    label.setAttribute('position', `${component.position.x} ${component.position.y + 0.2} ${component.position.z}`);
    label.setAttribute('class', 'clickable component-label');
    label.setAttribute('text', {
      value: component.label[CONFIG.currentLanguage],
      align: 'center',
      width: 2,
      color: 'white',
      wrapCount: 20
    });
    label.setAttribute('look-at', '#camera');
    
    // Add click event to show component info
    label.addEventListener('click', function() {
      showComponentInfo(componentId);
    });
    
    // Add to labels container
    labelsContainer.appendChild(label);
  });
}

// Create airflow arrows between components
function createAirflowArrows(flowType) {
  // Get arrows container
  const arrowsContainer = document.getElementById('arrows-container');
  
  // Clear existing arrows
  while (arrowsContainer.firstChild) {
    arrowsContainer.removeChild(arrowsContainer.firstChild);
  }
  
  // Get flow paths for current model
  const paths = CONFIG.airflowPaths[flowType];
  
  // Create arrows for each path
  paths.forEach((path, index) => {
    const fromComponent = CONFIG.components[path.from];
    const toComponent = CONFIG.components[path.to];
    
    // Create the arrow entity
    const arrow = document.createElement('a-entity');
    arrow.setAttribute('id', `arrow-${index}`);
    
    // Set color based on type
    let color;
    switch(path.type) {
      case 'red': color = '#ff4d4d'; break;
      case 'blue': color = '#4d79ff'; break;
      case 'orange': color = '#ff9933'; break;
      default: color = '#ffffff';
    }
    
    // Create a simple line for now (can be replaced with animated arrows later)
    arrow.setAttribute('line', {
      start: `${fromComponent.position.x} ${fromComponent.position.y} ${fromComponent.position.z}`,
      end: `${toComponent.position.x} ${toComponent.position.y} ${toComponent.position.z}`,
      color: color,
      opacity: 0.8,
      width: 0.02
    });
    
    // Add to arrows container
    arrowsContainer.appendChild(arrow);
  });
}

// Function to go back to selection screen
function goBack() {
  // Hide AR screen, show selection screen
  document.getElementById('ar-screen').classList.remove('active');
  document.getElementById('selection-screen').classList.add('active');
  
  // Reset model loaded state
  CONFIG.isModelLoaded = false;
  CONFIG.currentComponent = null;
  
  // Hide info panels
  document.getElementById('component-info').classList.add('hidden');
  document.getElementById('step-instructions').classList.add('hidden');
  
  // Remove model and elements from scene to free memory
  const model = document.getElementById('model');
  if (model) {
    model.removeAttribute('gltf-model');
  }
  
  // Clear labels and arrows
  const labelsContainer = document.getElementById('labels-container');
  const arrowsContainer = document.getElementById('arrows-container');
  
  while (labelsContainer.firstChild) {
    labelsContainer.removeChild(labelsContainer.firstChild);
  }
  
  while (arrowsContainer.firstChild) {
    arrowsContainer.removeChild(arrowsContainer.firstChild);
  }
}

// Function to show component information
function showComponentInfo(componentId) {
  if (!CONFIG.components[componentId]) return;
  
  // Update current component
  CONFIG.currentComponent = componentId;
  const component = CONFIG.components[componentId];
  
  // Update component info panel
  const componentInfo = document.getElementById('component-info');
  const componentDetails = document.getElementById('component-details');
  componentDetails.innerHTML = `<p>${component.info[CONFIG.currentLanguage]}</p>`;
  componentInfo.classList.remove('hidden');
  
  // Update step instructions
  const stepInstructions = document.getElementById('step-instructions');
  const stepTitle = stepInstructions.querySelector('.step-title');
  const stepDetails = document.getElementById('step-details');
  
  // Set title
  stepTitle.textContent = component.step.title[CONFIG.currentLanguage];
  
  // Set details
  stepDetails.innerHTML = '';
  component.step.details.forEach(detail => {
    const bmPara = document.createElement('p');
    bmPara.className = 'bm-text' + (CONFIG.currentLanguage === 'eng' ? ' hidden' : '');
    bmPara.innerHTML = `✓ ${detail.bm}`;
    
    const engPara = document.createElement('p');
    engPara.className = 'eng-text' + (CONFIG.currentLanguage === 'bm' ? ' hidden' : '');
    engPara.innerHTML = `✓ ${detail.eng}`;
    
    stepDetails.appendChild(bmPara);
    stepDetails.appendChild(engPara);
  });
  
  stepInstructions.classList.remove('hidden');
  
  // Highlight the selected component (future enhancement)
  // We could add visual highlighting to the selected component
}

// Function to update UI based on language setting
function updateUILanguage() {
  // Update all component labels
  Object.keys(CONFIG.components).forEach(componentId => {
    const labelElement = document.getElementById(`label-${componentId}`);
    if (labelElement) {
      labelElement.setAttribute('text', {
        value: CONFIG.components[componentId].label[CONFIG.currentLanguage],
        align: 'center',
        width: 2,
        color: 'white',
        wrapCount: 20
      });
    }
  });
  
  // Update component info if one is selected
  if (CONFIG.currentComponent) {
    showComponentInfo(CONFIG.currentComponent);
  }
  
  // Toggle text visibility based on language
  const bmTexts = document.querySelectorAll('.bm-text');
  const engTexts = document.querySelectorAll('.eng-text');
  
  bmTexts.forEach(text => {
    text.classList.toggle('hidden', CONFIG.currentLanguage === 'eng');
  });
  
  engTexts.forEach(text => {
    text.classList.toggle('hidden', CONFIG.currentLanguage === 'bm');
  });
}

// Function to toggle between modules (airflow and problem)
function toggleModule(moduleName) {
  // Update current module
  CONFIG.currentModule = moduleName;
  
  // Update UI
  const airflowButton = document.getElementById('airflow-module');
  const problemButton = document.getElementById('problem-module');
  
  if (moduleName === 'airflow') {
    airflowButton.classList.add('active');
    problemButton.classList.remove('active');
    document.getElementById('fault-panel').classList.add('hidden');
    document.getElementById('problem-overlay').classList.add('hidden');
    document.getElementById('color-legend').classList.remove('hidden');
  } else {
    airflowButton.classList.remove('active');
    problemButton.classList.add('active');
    document.getElementById('fault-panel').classList.remove('hidden');
    document.getElementById('color-legend').classList.add('hidden');
    // Show condenser blockage fault by default
    showFault('condenser_blocked');
  }
  
  // Update content based on module
  if (CONFIG.isModelLoaded) {
    if (moduleName === 'airflow' && CONFIG.currentModel === 'acc4.glb') {
      loadModel('model.glb');
    } else if (moduleName === 'problem' && CONFIG.currentModel === 'model.glb') {
      loadModel('acc4.glb');
    } else {
      // If the model is already loaded but we're just switching modes
      // Update the arrows and component displays
      if (CONFIG.currentModel === 'acc4.glb' && moduleName === 'problem') {
        createAirflowArrows('faulty');
        showFault('condenser_blocked');
      } else if (CONFIG.currentModel === 'model.glb' && moduleName === 'airflow') {
        createAirflowArrows('normal');
      }
    }
  }
}

// Function to show fault information
function showFault(faultId) {
  if (!CONFIG.faults[faultId]) return;
  
  // Update current fault
  CONFIG.currentFault = faultId;
  const fault = CONFIG.faults[faultId];
  
  // Update fault buttons
  const faultButtons = document.querySelectorAll('.fault-button');
  faultButtons.forEach(button => {
    button.classList.toggle('active', button.getAttribute('data-fault') === faultId);
  });
  
  // Show problem overlay
  const overlay = document.getElementById('problem-overlay');
  overlay.classList.remove('hidden');
  
  // Update problem text
  const problemTitleElement = document.getElementById('problem-title');
  const problemEffectElement = document.getElementById('problem-effect');
  const problemSimulationElement = document.getElementById('problem-simulation');
  const problemDescriptionElement = document.getElementById('problem-description');
  
  problemTitleElement.textContent = fault.problem[CONFIG.currentLanguage];
  
  if (problemEffectElement && fault.effect) {
    problemEffectElement.textContent = fault.effect[CONFIG.currentLanguage];
  }
  
  if (problemSimulationElement && fault.simulation) {
    problemSimulationElement.textContent = fault.simulation[CONFIG.currentLanguage];
  }
  
  if (problemDescriptionElement && fault.description) {
    problemDescriptionElement.textContent = fault.description[CONFIG.currentLanguage];
  }
  
  // Highlight the affected component
  highlightFaultyComponent(fault.affectedComponent);
  
  // Update arrows based on fault
  if (faultId === 'condenser_blocked') {
    createAirflowArrows('faulty'); // This will only show arrows entering condenser but not exiting
  }
}

// Function to highlight the faulty component
function highlightFaultyComponent(componentId) {
  // Remove previous highlights
  const labels = document.querySelectorAll('.component-label');
  labels.forEach(label => {
    label.setAttribute('text', {
      color: 'white'
    });
  });
  
  // Remove previous warning icons
  const warningIcons = document.querySelectorAll('.warning-icon');
  warningIcons.forEach(icon => {
    icon.parentNode.removeChild(icon);
  });
  
  if (!componentId || !CONFIG.components[componentId]) return;
  
  // Highlight the faulty component label
  const labelElement = document.getElementById(`label-${componentId}`);
  if (labelElement) {
    labelElement.setAttribute('text', {
      color: '#ff0000',
      weight: 'bold'
    });
    
    // Add warning icon
    const component = CONFIG.components[componentId];
    const labelsContainer = document.getElementById('labels-container');
    const warningIcon = document.createElement('a-entity');
    warningIcon.setAttribute('id', `warning-${componentId}`);
    warningIcon.setAttribute('class', 'warning-icon');
    warningIcon.setAttribute('position', `${component.position.x + 0.3} ${component.position.y + 0.2} ${component.position.z}`);
    warningIcon.setAttribute('text', {
      value: '⚠️',
      color: '#ff0000',
      align: 'center',
      width: 2,
      wrapCount: 20
    });
    warningIcon.setAttribute('look-at', '#camera');
    labelsContainer.appendChild(warningIcon);
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  console.log('Page loaded, initializing AR viewer');
  
  // Setup module button event listeners
  document.getElementById('airflow-module').addEventListener('click', () => {
    toggleModule('airflow');
  });
  
  document.getElementById('problem-module').addEventListener('click', () => {
    toggleModule('problem');
  });
  
  // Setup language toggle buttons
  document.getElementById('bm-toggle').addEventListener('click', () => {
    CONFIG.currentLanguage = 'bm';
    document.getElementById('bm-toggle').classList.add('active');
    document.getElementById('eng-toggle').classList.remove('active');
    updateUILanguage();
  });
  
  document.getElementById('eng-toggle').addEventListener('click', () => {
    CONFIG.currentLanguage = 'eng';
    document.getElementById('bm-toggle').classList.remove('active');
    document.getElementById('eng-toggle').classList.add('active');
    updateUILanguage();
  });
  
  // Setup fault buttons
  const faultButtons = document.querySelectorAll('.fault-button');
  faultButtons.forEach(button => {
    button.addEventListener('click', () => {
      const faultId = button.getAttribute('data-fault');
      if (faultId) {
        showFault(faultId);
      }
    });
  });
  
  // Scene setup and model interaction
  const scene = document.querySelector('a-scene');
  const model = document.getElementById('model');
  
  // Mouse wheel zoom for desktop users
  scene.addEventListener('wheel', (e) => {
    if (!CONFIG.isModelLoaded) return;
    
    e.preventDefault();
    const currentScale = model.getAttribute('scale');
    let newScale = currentScale.x;
    
    // Zoom in/out based on wheel direction
    if (e.deltaY < 0) {
      // Zoom in
      newScale = Math.min(newScale * 1.1, 3);
    } else {
      // Zoom out
      newScale = Math.max(newScale * 0.9, 0.5);
    }
    
    model.setAttribute('scale', `${newScale} ${newScale} ${newScale}`);
  });
  
  // Mobile pinch zoom
  let initialDistance = 0;
  
  scene.addEventListener('touchstart', (e) => {
    if (e.touches.length >= 2) {
      // Store initial pinch distance
      initialDistance = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
    }
  });
  
  scene.addEventListener('touchmove', (e) => {
    if (e.touches.length >= 2 && initialDistance > 0 && CONFIG.isModelLoaded) {
      // Calculate new distance
      const currentDistance = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      
      // Calculate scale factor
      const delta = currentDistance / initialDistance;
      
      // Get current scale and apply delta
      const currentScale = model.getAttribute('scale');
      const newScale = Math.min(Math.max(currentScale.x * delta, 0.5), 3);
      
      // Apply new scale
      model.setAttribute('scale', `${newScale} ${newScale} ${newScale}`);
      
      // Update initial distance for next move
      initialDistance = currentDistance;
    }
  });
  
  scene.addEventListener('touchend', () => {
    initialDistance = 0;
  });
  
  // Register A-Frame animation component for arrows
  if (AFRAME) {
    // Register animated arrows component
    AFRAME.registerComponent('animated-arrow', {
      schema: {
        color: {default: '#FFFFFF'},
        speed: {default: 1.0},
        direction: {default: 1} // 1 = forward, -1 = backward
      },
      
      init: function() {
        this.time = 0;
        const material = new THREE.MeshBasicMaterial({
          color: this.data.color,
          transparent: true,
          opacity: 0.8
        });
        
        // Will be implemented with actual arrow mesh
      },
      
      tick: function(time, deltaTime) {
        // Animation logic will be implemented here
      }
    });
  }
});

// Function to handle model loading errors and retry
window.addEventListener('error', function(e) {
  console.error('Error in script:', e);
});

// A-Frame specific error handling
if (AFRAME) {
  AFRAME.registerComponent('error-handler', {
    init: function() {
      this.el.addEventListener('model-error', function(e) {
        console.error('Model error:', e.detail);
        alert('There was an error loading the 3D model');
      });
    }
  });
}
