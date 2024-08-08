export function autoScrollByID(id: string): void {
    const element = document.getElementById(id);
    if (element) {
        window.scrollTo({
            top: element.offsetTop,
            behavior: 'smooth'
        });
    }
}