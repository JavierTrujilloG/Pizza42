import React from 'react';
import { Link } from 'react-router-dom';

const LogoContent = (props) => {
   const { width, type, linkToHome, ...rest } = props;

   return (
      <img
         {...rest}
         src={`TODO`}
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
            <Link to="/">
               <LogoContent {...props} />
            </Link>
         ) : (
            <LogoContent {...props} />
         )}
      </>
   );
};

export default Logo;

