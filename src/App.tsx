import { useState, useEffect } from 'react';
import * as Components from './App.styles';
import * as Photos from './service/photos';
import { Photo } from './types/Photo';

const App = () => {
    const [loading, setLoading] = useState(false);
    const [photos, setPhotos] = useState<Photo[]>([]);

    useEffect(() => {
        const getPhotos = async () => {
            setLoading(true);
            setPhotos(await Photos.getAll());
            setLoading(false);
        };

        getPhotos();
    }, []);
  return (
    <Components.Container>
      <Components.Area>
        <Components.Header>Galeria de Fotos</Components.Header>
          {loading &&
            <Components.ScreenWarning>
                <div className="emoji">🤚</div>
                <div>Carregando...</div>
            </Components.ScreenWarning>
          }
          {!loading && photos.length > 0 &&
              <Components.PhotoList>
                  {photos.map((item, index) => (
                    <div>{item.name}</div>
                  ))}
              </Components.PhotoList>
          }

          {!loading && photos.length === 0 &&
              <Components.ScreenWarning>
                  <div className="emoji">😞</div>
                  <div>Não há foto cadastradas</div>
              </Components.ScreenWarning>
          }
      </Components.Area>
    </Components.Container>
  );
}

export default App;
