function skillsMember() {
    const skills = document.querySelector('.skills');
    const skillsContent = document.querySelectorAll('.skills-content');
    const skillsHeader = document.querySelectorAll('.skills-header');

    function toggleSkills() {
        let itemClass = this.parentNode.className;

        for (i = 0; i < skillsContent.length; i++) {
            skillsContent[i].className = 'skills-content skills-close';
        }
        if (itemClass === 'skills-content skills-close') {
            this.parentNode.className = 'skills-content skills-open';
        }
    }

    skillsHeader.forEach((el) => {
        el.addEventListener('click', toggleSkills);
    });
}
    