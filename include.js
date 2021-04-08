/**
 * Searches for all elements with the 'data-include-html' attribute,
 * uses the attribute value to fetch the specified file, and inserts
 * the file's contents into the element.
 */
function includeHTML() {
    /**
     * A helper to fetch and insert included file contents into the container element.
     * @param {Element} includeEl - An element with the 'data-include-html' attribute.
     */
    async function insertContent(includeEl) {
        const includeFile = includeEl.getAttribute('data-include-html');

        try {
            const response = await fetch(includeFile);
            if(!response.ok) return;

            const responseText = await response.text();
            console.log(responseText);
            
            includeEl.innerHTML = responseText;
        }catch(err) {
            console.error(`Error inserting content from '${includeFile}'.`, err);
        }
    }

    // Find the includes and insert their content
    const includes = document.querySelectorAll('[data-include-html]');
    includes.forEach(include => insertContent(include));
}

includeHTML();