const emptyCartBtn = document.querySelector('#emptyCartBtn')
const cartContainer = document.querySelector('#cartContainer')
const buyForm = document.querySelector('#buyForm')

if(emptyCartBtn){
    emptyCartBtn.addEventListener('click', async (e) => {
        e.preventDefault()
        const cId = document.getElementById('cId').value;
        console.log('Valor de cId:', cId);
        const response = await fetch(`/api/carts/${cId}`, {
            method: 'delete',
        })
    
        cartContainer.innerHTML = ""
        emptyCartBtn.remove();
        buyForm.innerHTML = ''
    })
}