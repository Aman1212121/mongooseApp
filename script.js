document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bulkProductForm');
    const productsContainer = document.getElementById('productsContainer');
    const addProductBtn = document.getElementById('addProductBtn');

    addProductBtn.addEventListener('click', () => {
        addProductField();
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const productList = [];

        for (const entry of formData.entries()) {
            const [key, value] = entry;
            if (key.startsWith('product_')) {
                const productData = Object.fromEntries(formData.getAll(key).map((val, index) => [`products[${index}].${key.replace('product_', '')}`, val]));
                productList.push(productData);
            }
        }
        try {
            const response = await fetch('/api/save-in-bulk', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productList)
            });
            if (response.ok) {
                alert('Products saved successfully!');
                form.reset();
            } else {
                throw new Error('Failed to save products');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to save products');
        }
    });

    function addProductField() {
        const productField = `
            <div>
                <input type="text" name="product_id" placeholder="Product ID">
                <input type="text" name="product_title" placeholder="Title">
                <textarea name="product_description" placeholder="Description"></textarea>
                <input type="number" name="product_price" placeholder="Price">
                <input type="number" name="product_discountPercentage" placeholder="Discount Percentage">
                <input type="number" name="product_rating" placeholder="Rating">
                <input type="number" name="product_stock" placeholder="Stock">
                <input type="text" name="product_brand" placeholder="Brand">
                <input type="text" name="product_category" placeholder="Category">
                <input type="text" name="product_thumbnail" placeholder="Thumbnail URL">
                <input type="text" name="product_images" placeholder="Image URLs (comma separated)">
            </div>
        `;
        productsContainer.insertAdjacentHTML('beforeend', productField);
    }
});
