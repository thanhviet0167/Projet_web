let carts = document.querySelectorAll('.add-cart');

for(let i = 0; i < carts.length; i++)
{
    carts[i].addEventListener('click', () => 
    {
        cartNumbers();
    }
    )
}

function onLoadCartNumbers()
{
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers)
    {
        document.querySelector('#cartNumbers').textContent = productNumbers;
    }
}

function cartNumbers()
{
    let itemNumbers = localStorage.getItem('cartNumbers');
    itemNumbers = parseInt(itemNumbers);
    if(itemNumbers)
    {
        localStorage.setItem('cartNumbers', itemNumbers + 1);
        document.querySelector('#cartNumbers').textContent = itemNumbers + 1;
    }
    else
    {
        localStorage.setItem('cartNumbers',1);
        document.querySelector('#cartNumbers').textContent = 1
    }
}



onLoadCartNumbers();