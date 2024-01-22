import SunnyImage from '../assets/sole3d.png';
import RainyImage from '../assets/pioggia.png';
import nuvoloso from '../assets/nuvoloso.png';
import Neve from '../assets/neve.png';
import tempesta from '../assets/tempesta.png';

function getWeatherInfo(condition) {
  switch (condition) {
    case 'Clear':
      return {
        image: SunnyImage,
        description: 'Soleggiato',
      };
    case 'Rain':
      return {
        image: RainyImage,
        description: 'Pioggia',
      };
    case 'Clouds':
      return {
        image: nuvoloso,
        description: 'Nuvoloso',
      };
      case 'Snow':
      return {
        image: Neve,
        description: 'Neve',
      };
      case 'Storm':
      return {
        image: tempesta ,
        description: 'Tempesta',
      };
    
    default:
      return {
        image: SunnyImage,
        description: 'Condizioni non specificate',
      };
  }
}

export default getWeatherInfo;

  

