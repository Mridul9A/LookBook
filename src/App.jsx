import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LookBook from './components/LookBook';
import ProductDetailPage from './pages/ProductDetailPage';

const App = () => {
  const looks = [
    {
      media: [
        { type: 'image', url: '/image/image1.jpg', annotations: [{ productId: 1, top: '10%', left: '20%', label: 'Product 1' }] },
        { type: 'image', url: '/image/image2.jpg', annotations: [{ productId: 2, top: '50%', left: '30%', label: 'Product 2' }] },
        

      ],
      products: [
        { id: 1, name: 'Product 1', detailUrl: '/product/1' },
        { id: 2, name: 'Product 2', detailUrl: '/product/2' },
      ],
    },
    {
      media: [
        { type: 'image', url: '/image/image3.jpg', annotations: [{ productId: 3, top: '40%', left: '60%', label: 'Product 3' }] },
        { type: 'image', url: '/image/image4.jpg', annotations: [{ productId: 4, top: '50%', left: '30%', label: 'Product 4' }] },
        { type: 'video', url: '/video/5286263-hd_1920_1080_30fps.mp4' },
      ],
      products: [{ id: 3, name: 'Product 3', detailUrl: '/product/3' },{ id: 4, name: 'Product 4', detailUrl: '/product/4' }],
      
    },
  ];

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LookBook looks={looks} />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
