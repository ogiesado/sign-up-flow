import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTE_FORM } from './constants';

import './styles/home.scss';

export default function Home() {
  return (
    <section className="home">
      <h1 className="home__heading">Welcome</h1>
      <p className="home__text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim felis,
        ultrices a tincidunt a, congue a ipsum. Sed porttitor tincidunt magna
        sed ornare. Nam sit amet placerat mauris. Curabitur non elementum quam.
        Fusce accumsan ex ut metus porta.
      </p>
      <p className="home__text">
        Vivamus sagittis auctor finibus. Morbi non lorem eu tellus feugiat
        sagittis eget at elit. Etiam consectetur mi et ex consectetur, ut
        viverra elit ornare. Praesent magna nulla, aliquam id est sit amet,
        malesuada facilisis est. Phasellus aliquet mollis nibh, ultricies
        hendrerit est faucibus a. Curabitur lobortis ultrices consequat.
        Phasellus non molestie leo.
      </p>
      <Link to={ROUTE_FORM} className="home__button">
        Next
      </Link>
    </section>
  );
}
