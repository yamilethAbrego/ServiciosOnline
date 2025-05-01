// Datos
const products = [
    {
        id: 1,
        name: 'Fiesta Infantil',
        price: '$199.99',
        description: 'Organizamos fiestas temáticas para niños con juegos, decoración y animación personalizada.',
        details: {
            includes: ['Decoración temática', 'Juegos infantiles', 'Animación para niños'],
            duration: '3 horas'
        },
        imageUrl: 'img/1.png'
    },
    {
        id: 2,
        name: 'Fiesta de Adultos',
        price: '$299.99',
        description: 'Experiencias únicas para adultos con música, catering y diseño temático exclusivos.',
        details: {
            includes: ['Música en vivo o DJ', 'Catering personalizado', 'Barra de bebidas'],
            duration: '4 horas'
        },
        imageUrl: 'img/2.png'
    },
    {
        id: 3,
        name: 'Eventos Corporativos',
        price: '$399.99',
        description: 'Eventos elegantes y organizados para empresas, con servicio profesional de principio a fin.',
        details: {
            includes: ['Equipo audiovisual', 'Catering corporativo', 'Gestión de agenda'],
            duration: '6 horas'
        },
        imageUrl: 'img/3.png'
    },
    {
        id: 4,
        name: 'Fiesta Personalizada',
        price: '$499.99',
        description: 'Creamos fiestas a tu medida, adaptándonos a tus gustos y necesidades.',
        details: {
            includes: ['Decoración personalizada', 'Entretenimiento según preferencia', 'Servicio completo de comida y bebida'],
            duration: 'Según el cliente'
        },
        imageUrl: 'img/4.png'
    }
];

const teamMembers = [
    { id: 1, name: 'Ramos Alvarado, Hernan Ariel', carnet: 'RA15019', contribucion: 'Diseño de la página Payment y Contacto. diseño la interfaz grafica de la pagina de contacto, asegurando un diseño responsivo y accesible.', imageUrl: 'img/RA.jpg' },
    { id: 2, name: 'Alvarado Alvarado, Sindy Alissette', carnet: 'AA22047',  contribucion: 'Diseño de la página Términos y Condiciones y Payment. Redactó y estructuró los textos legales para la sección de términos y condiciones. También contribuyo a la integracion del proceso de pago con imagenes que mejoran la experiencia del usuario.', imageUrl: 'img/AA.jpg' },
    { id: 3, name: 'Aquino Gomez, Jorge Bladimir', carnet: 'AG20006', contribucion: 'Diseño de la página Equipo y Quiénes somos. Desarrolló la presentación del equipo con imágenes y biografías, y creó una línea de tiempo interactiva para la página de Quiénes somos, destacando la historia de la organización.', imageUrl: 'img/AG.jpg' },
    { id: 4, name: 'Abrego de la O, Santos Yamileth', carnet: 'AO23007', contribucion: 'Diseño de la página Inicio, Catálogo y Menú Principal. Organizó los elementos visuales del menú principal, añadió efectos interactivos al catálogo.', imageUrl: 'img/AO.jpg' }
];

// Estado
let formData = {
    name: '',
    email: '',
    message: ''
};

// Funciones
function showPage(pageId) {
    // Oculta todas las páginas
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Desactiva todos los botones de navegación
    document.querySelectorAll('.nav-links .btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Muestra la página seleccionada
    document.getElementById(`page-${pageId}`).classList.add('active');
    
    // Activa el botón correspondiente
    document.getElementById(`nav-${pageId}`).classList.add('active');

    // Ejecutar animaciones específicas de la página
    if (pageId === 'catalog') {
        addHoverEffectToPrices();
        addClickAnimationToCards();
    }
}

function renderProducts() {
    const container = document.getElementById('products-container');
    container.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'card';
        productCard.innerHTML = `
            <div class="card-header">
                <h2 class="card-title">${product.name}</h2>
                <p class="text-primary font-bold price">${product.price}</p>
            </div>
            <div class="card-content">
                <img src="${product.imageUrl}" alt="${product.name}" class="w-full h-48 mb-4">
                <p>${product.description}</p>
                <button class="btn btn-primary w-full mt-4" data-id="${product.id}">Ver detalles</button>
            </div>
        `;
        container.appendChild(productCard);
    });

    // Añadir eventos a los botones "Ver detalles"
    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('click', handleViewDetails);
    });

    addHoverEffectToPrices(); // Efecto de hover en precios
}

function renderTeam() {
    const container = document.getElementById('team-container');
    container.innerHTML = '';

    teamMembers.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = 'card';
        memberCard.innerHTML = `
            <div class="card-header">
                <h2 class="card-title">${member.name}</h2>
                <p class="text-gray-600">${member.carnet}</p>
            </div>
            <div class="card-content">
                <img src="${member.imageUrl}" alt="${member.name}" class="w-32 h-32 rounded-full object-cover mb-4">
                <p><strong>Contribucion:</strong> ${member.contribucion}</p>
            </div>
        `;
        container.appendChild(memberCard);
    });
}

function handleViewDetails(e) {
    const productId = e.target.getAttribute('data-id');
    const product = products.find(p => p.id == productId);

    // Crear el contenido del modal
    const modal = document.getElementById('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <h2>${product.name}</h2>
            <p><strong>Descripción:</strong> ${product.description}</p>
            <p><strong>Incluye:</strong></p>
            <ul>
                ${product.details.includes.map(item => `<li>${item}</li>`).join('')}
            </ul>
            <p><strong>Duración:</strong> ${product.details.duration}</p>
            <button id="close-modal" class="btn btn-secondary mt-4">Cerrar</button>
        </div>
    `;

    // Mostrar el modal
    modal.classList.add('active');

    // Animar el modal con anime.js
    anime({
        targets: '.modal-content',
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutQuad'
    });

    // Añadir evento para cerrar el modal
    document.getElementById('close-modal').addEventListener('click', closeModal);
}

function closeModal() {
    const modal = document.getElementById('modal');

    // Animar salida del modal
    anime({
        targets: '.modal-content',
        scale: [1, 0.8],
        opacity: [1, 0],
        duration: 500,
        easing: 'easeInQuad',
        complete: () => {
            modal.classList.remove('active');
            modal.innerHTML = ''; // Limpiar el contenido del modal
        }
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    alert('Message sent! (This is a demo)');
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
    formData = { name: '', email: '', message: '' };
}

function handleInputChange(e) {
    const { name, value } = e.target;
    formData[name] = value;
}

// Detectar si es móvil
function isMobile() {
    return window.innerWidth <= 768; // Consideramos móvil si el ancho es menor o igual a 768px
}

// Animaciones con Anime.js
function addHoverEffectToPrices() {
    if (isMobile()) return; // Deshabilitamos el hover en móviles

    document.querySelectorAll('.price').forEach(price => {
        price.addEventListener('mouseenter', () => {
            anime({
                targets: price,
                rotate: [0, 10, -10, 0],
                duration: 800,
                easing: 'easeInOutSine'
            });
        });
    });
}

function addClickAnimationToCards() {
    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            anime({
                targets: card,
                scale: 1.2,
                duration: isMobile() ? 300 : 500, // Escalado más rápido en móvil
                easing: 'easeInOutQuad'
            });
            setTimeout(() => {
                anime({
                    targets: card,
                    scale: 1,
                    duration: isMobile() ? 300 : 500,
                    easing: 'easeInOutQuad'
                });
            }, 1000);
        });
    });
}

// Inicialización
function init() {
    // Configurar listeners para navegación
    document.getElementById('nav-home').addEventListener('click', () => showPage('home'));
    document.getElementById('nav-team').addEventListener('click', () => showPage('team'));
    document.getElementById('nav-about').addEventListener('click', () => showPage('about'));
    document.getElementById('nav-catalog').addEventListener('click', () => showPage('catalog'));
    document.getElementById('nav-payment').addEventListener('click', () => showPage('payment'));
    document.getElementById('nav-contact').addEventListener('click', () => showPage('contact'));
    document.getElementById('nav-terms').addEventListener('click', () => showPage('terms'));

    // Configurar listener para el formulario
    document.getElementById('contact-form').addEventListener('submit', handleFormSubmit);
    document.getElementById('name').addEventListener('input', handleInputChange);
    document.getElementById('email').addEventListener('input', handleInputChange);
    document.getElementById('message').addEventListener('input', handleInputChange);

    // Renderizar datos iniciales
    renderProducts();
    renderTeam();


}

// Iniciar aplicación cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', init);