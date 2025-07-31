function showSection(sectionId) {
    // Masquer toutes les sections du conteneur parent
    const sections = document.querySelectorAll('#page-center > div');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Afficher la section spécifiée si elle existe
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
        
        // Optionnel: Faire défiler jusqu'à la section
        targetSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        console.warn(`Section with ID "${sectionId}" not found`);
    }
    
    return false; // Empêche le comportement par défaut des liens
}
















