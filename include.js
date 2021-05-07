/**
 * Searches for all elements with the 'data-inject-html' attribute,
 * uses the attribute value to fetch the specified file, and inserts
 * the file's contents into the element.
 */
function injectHTML() {
    /**
     * A helper to fetch and insert file contents into the container element.
     * @param {Element} injectEl - An element with the 'data-inject-html' attribute.
     */
    async function insertContent(injectEl) {
        const injectFile = injectEl.getAttribute('data-inject-html');

        try {
            const response = await fetch(injectFile);
            if(!response.ok) return;

            const responseText = await response.text();
            console.log(responseText);
            
            injectEl.innerHTML = responseText;
        } catch(error) {
            console.error(`Error injecting content from '${injectFile}'.`, error);
        }
    }

    // Find the injects and insert their content
    const injects = document.querySelectorAll('[data-inject-html]');
    injects.forEach(inject => insertContent(inject));
}

/**
 * Searches for all elements with the 'data-include-html' attribute,
 * uses the attribute value to fetch the specified file, and replaces
 * the element with the file's contents.
 */
function includeHTML() {
    /**
     * A helper to replace the element with the fetched file contents.
     * @param {Element} includeEl - An element with the 'data-include-html' attribute.
     */
    async function replaceWithContent(includeEl) {
        const includeFile = includeEl.getAttribute('data-include-html');

        try {
            const response = await fetch(includeFile);
            if(!response.ok) return;

            const responseText = await response.text();
            console.log(responseText);

            const template = document.createElement('template');
            template.innerHTML = responseText;

            includeEl.after(...template.content.children);
            includeEl.remove();
        } catch(error) {
            console.error(`Error including content from '${includeFile}'.`, error);
        }
    }

    // Find the includes and insert their content
    const includes = document.querySelectorAll('[data-include-html]');
    includes.forEach(include => replaceWithContent(include));
}

injectHTML();
includeHTML();