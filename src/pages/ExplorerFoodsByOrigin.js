import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExplorerFoodsByOrigin() {
  const secondButton = true;
  return (
    <div>
      <Header text="Explorar Origem" secondButton={ secondButton } />
      <Footer />
    </div>
  );
}

export default ExplorerFoodsByOrigin;
