function showSection(sectionId) {
    // Masquer toutes les sections du conteneur parent
    const sections = document.querySelectorAll('#page-center > div');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Afficher la section spécifiée si elle existe, sinon afficher home-section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
        targetSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        const home = document.getElementById('home-section');
        if (home) home.style.display = 'block';
    }

    return false; // Empêche le comportement par défaut des liens
}