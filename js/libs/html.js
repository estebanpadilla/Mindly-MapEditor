
export const div = (attributes, parent, children) => {
    return tag('div', attributes, parent, children);
};

export const h1 = (attributes, parent, children) => {
    return tag('h1', attributes, parent, children);
};

export const h2 = (attributes, parent, children) => {
    return tag('h2', attributes, parent, children);
};

export const p = (attributes, parent, children) => {
    return tag('p', attributes, parent, children);
};

export const button = (attributes, parent, children) => {
    return tag('button', attributes, parent, children);
};

export const input = (attributes, parent, children) => {
    return tag('input', attributes, parent, children);
};

export const select = (attributes, parent, children) => {
    return tag('select', attributes, parent, children);
};

export const option = (attributes, parent, children) => {
    return tag('option', attributes, parent, children);
};

export const hr = (attributes, parent, children) => {
    return tag('hr', attributes, parent, children);
};

export const tag = (type, attributes, parent, children) => {
    let e = document.createElement(type);
    if (parent) parent.appendChild(e);
    if (children)
        children.map((child) => {
            e.appendChild(child);
        });
    for (const k in attributes) {
        e[k] = attributes[k];
    }
    return e;
};
