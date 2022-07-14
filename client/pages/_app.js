import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from './common/Header';


const AppComponent = ({ Component, pageProps, currentUser }) =>{
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

// this is a NextJs method to get props on server side.
AppComponent.getInitialProps = async appContext => {
  const { ctx, Component } = appContext;
  const client = buildClient(ctx);
  const { data } = await client.get('api/users/currentuser');

  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  console.log(pageProps);
  
  // ...data == data.currentUser since that is the only property on data;
  return {
    pageProps,
    ...data
  };
}

export default AppComponent;