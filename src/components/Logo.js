import React from 'react';
import { Link } from 'react-router-dom';

const LogoContent = (props) => {
   const { width, type, linkToHome, ...rest } = props;

   return (
      <img
         {...rest}
         src={`/images/pizza42_logo_white.png`}
         alt="logo"
         width={(width || 100) + 'px'}
      />
   );
};

const Logo = (props) => {
   const { linkToHome } = props;

   return (
      <>
         {linkToHome ? (
            <Link to="/home">
               <LogoContent {...props} />
            </Link>
         ) : (
            <LogoContent {...props} />
         )}
      </>
   );
};

export default Logo;

