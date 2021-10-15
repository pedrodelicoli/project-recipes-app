import React from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';

function Explorer() {
  const history = useHistory();
  return (
    <div>
      <Header text="Explorar" />
      <div className="content btns-explore">
        <Button
          testId="explore-food"
          handleClick={ () => history.push('/explorar/comidas') }
          className="btn-center"
        >
          Explorar Comidas
        </Button>
        <Button
          testId="explore-drinks"
          handleClick={ () => history.push('/explorar/bebidas') }
          className="btn-center"
        >
          Explorar Bebidas
        </Button>
      </div>
      <Footer />
    </div>
  );
}

export default Explorer;
