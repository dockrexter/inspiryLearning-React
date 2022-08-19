// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import { fetchToken, onMessageListener } from './firebase';
import { useState } from 'react';

// ----------------------------------------------------------------------

export default function App() {
  const [isTokenFound, setTokenFound] = useState(false);
  fetchToken(setTokenFound);

  onMessageListener().then(payload => {
    setNotification({title: payload.notification.title, body: payload.notification.body})
    setShow(true);
    console.log(payload);
  }).catch(err => console.log('failed: ', err));
  return (
    <ThemeProvider>
      <ScrollToTop /> 
         <BaseOptionChartStyle />
       <Router/>
    </ThemeProvider>
  );
}
