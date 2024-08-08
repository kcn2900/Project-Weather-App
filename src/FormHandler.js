function Form() {
    const form = createForm();
    function createForm() {
        const form = document.createElement('form');
        const submit = document.createElement('button');
        
        form.className = 'form';
        submit.className = 'form-submit';

        form.append(...createInput({
            element: 'input',
            label: 'location', 
            type:'text',
        }))
        form.append(submit);

        submit.textContent = 'Search';

        return form;
    }

    function createInput(obj) {
        const label = document.createElement('label');
        const input = document.createElement(`${obj.element}`);
        
        label.setAttribute('for', obj.label);
        label.textContent = `${obj.label[0].toUpperCase() + obj.label.slice(1)}: `

        input.id = obj.label;
        input.setAttribute('type', obj.type);
        input.setAttribute('placeholder', 'us');
        
        return [label, input];
    }

    return {
        form
    };
}

export { Form }