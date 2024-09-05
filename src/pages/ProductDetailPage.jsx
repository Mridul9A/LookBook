import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetailPage.css'; 

const products = [
  { 
    id: 1, 
    name: 'Navy Blue Formal Trouser', 
    imageUrl: '/image/image1.jpg', 
    price: 832, 
    maxPrice: 1699, 
    discount: '51% OFF', 
    description: 'Navy blue machine weave formal trouser. Slim fit. Mid-rise. Length: regular. Pattern: solid. Flat-front. 4 pockets.', 
    sizeFit: 'Slim Fit', 
    modelSize: 'The model (height 6\') is wearing a size 32', 
    material: '75% Polyester, 22% Viscose Rayon, 3% Spandex', 
    careInstructions: 'Machine Wash', 
    specifications: { 
      WaistRise: 'Mid-Rise', 
      Length: 'Regular', 
      Fit: 'Slim Fit', 
      PrintOrPatternType: 'Solid', 
      Closure: 'Button', 
      TypeOfPleat: 'Flat-Front', 
      WeaveType: 'Machine Weave', 
      FlyType: 'Zip' 
    } 
  },
  { 
    id: 2, 
    name: 'Black Casual Jeans', 
    imageUrl: '/image/image2.jpg', 
    price: 799, 
    maxPrice: 1599, 
    discount: '50% OFF', 
    description: 'Black casual jeans with a relaxed fit. Mid-rise. Length: regular. Pattern: solid. Straight leg. 5 pockets.', 
    sizeFit: 'Relaxed Fit', 
    modelSize: 'The model (height 5\'10") is wearing a size 30', 
    material: '85% Cotton, 14% Polyester, 1% Spandex', 
    careInstructions: 'Machine Wash', 
    specifications: { 
      WaistRise: 'Mid-Rise', 
      Length: 'Regular', 
      Fit: 'Relaxed Fit', 
      PrintOrPatternType: 'Solid', 
      Closure: 'Zip', 
      TypeOfPleat: 'None', 
      WeaveType: 'Denim', 
      FlyType: 'Zip' 
    } 
  },
  { 
    id: 3, 
    name: 'Grey Woolen Blazer', 
    imageUrl: '/image/image3.jpg', 
    price: 1299, 
    maxPrice: 2599, 
    discount: '50% OFF', 
    description: 'Grey woolen blazer with a slim fit. Notched lapel. Single-breasted. Length: regular. Pattern: checkered.', 
    sizeFit: 'Slim Fit', 
    modelSize: 'The model (height 6\') is wearing a size M', 
    material: '70% Wool, 30% Polyester', 
    careInstructions: 'Dry Clean Only', 
    specifications: { 
      WaistRise: 'Not Applicable', 
      Length: 'Regular', 
      Fit: 'Slim Fit', 
      PrintOrPatternType: 'Checkered', 
      Closure: 'Button', 
      TypeOfPleat: 'None', 
      WeaveType: 'Wool Blend', 
      FlyType: 'Button' 
    } 
  },
  { 
    id: 4, 
    name: 'White Cotton Shirt', 
    imageUrl: '/image/image4.jpg', 
    price: 499, 
    maxPrice: 999, 
    discount: '50% OFF', 
    description: 'White cotton shirt with a classic fit. Button-down collar. Full sleeves. Length: regular. Pattern: solid.', 
    sizeFit: 'Classic Fit', 
    modelSize: 'The model (height 5\'11") is wearing a size L', 
    material: '100% Cotton', 
    careInstructions: 'Machine Wash', 
    specifications: { 
      WaistRise: 'Not Applicable', 
      Length: 'Regular', 
      Fit: 'Classic Fit', 
      PrintOrPatternType: 'Solid', 
      Closure: 'Button', 
      TypeOfPleat: 'None', 
      WeaveType: 'Cotton', 
      FlyType: 'Button' 
    } 
  }
];

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-content">
        <div className="product-image">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        <div className="product-details">
          <h1>{product.name}</h1>
          <p>Price: ${product.price}</p>
          <p>Max Price: <span className="discount">${product.maxPrice}</span></p>
          <p>{product.description}</p>
          <p><strong>Size & Fit:</strong> {product.sizeFit}</p>
          <p><strong>Model Size:</strong> {product.modelSize}</p>
          <p><strong>Material:</strong> {product.material}</p>
          <p><strong>Care Instructions:</strong> {product.careInstructions}</p>
          <div className="specifications">
            <h3>Specifications:</h3>
            <ul>
              {Object.entries(product.specifications).map(([key, value]) => (
                <li key={key}><strong>{key.replace(/([A-Z])/g, ' $1')}:</strong> {value}</li>
              ))}
            </ul>
          </div>
          <button className="previous-button" onClick={() => navigate(-1)}>Previous</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
