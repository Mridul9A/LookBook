import React from 'react';
import { Link } from 'react-router-dom';
import './Style/Annotation.css';

const Annotation = ({ annotation, products }) => {
  const { productId, top, left, label } = annotation;
  const product = products.find(p => p.id === productId);

  if (!product) return null;

  return (
    <div
      className="annotation"
      style={{
        top,
        left,
        transform: 'translate(-50%, -50%)', 
      }}
    >
      <div>{label}</div>
      <Link to={`/product/${productId}`}>Shop</Link>
    </div>
  );
};

export default Annotation;
