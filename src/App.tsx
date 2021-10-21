import { useState, useEffect, FormEvent } from 'react';
import * as Components from './App.styles';
import * as Photos from './service/photos';
import { Photo } from './types/Photo';
import { PhotoItem } from './components/PhotoItem';

const App = () => {
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [photos, setPhotos] = useState<Photo[]>([]);

    useEffect(() => {
        getPhotos();
    }, []);

    const getPhotos = async () => {
        setLoading(true);
        setPhotos(await Photos.getAll());
        setLoading(false);
    };

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const file = formData.get('image') as File;
        if(file && file.size > 0) {
            setUploading(true);
            let result = await Photos.insert(file);
            setUploading(false);

            if(result instanceof Error) {
                alert(`${result.name} - ${result.message}`)
            } else {
                let newPhotoList = [...photos];
                newPhotoList.push(result);
                setPhotos(newPhotoList);
            }
        }
    }

    const handleDeleteClick = async (name: string) => {
        await Photos.deletePhoto(name);
        getPhotos();
    }

    return (
        <Components.Container>
            <Components.Area>
            <Components.Header>Galeria de Fotos</Components.Header>

              <Components.UploadForm method="POST" onSubmit={handleFormSubmit}>
                  <input type="file" name="image"/>
                  <input type="submit" value="Enviar"/>
                  {uploading && "Enviando..."}
              </Components.UploadForm>

              {loading &&
                <Components.ScreenWarning>
                    <div className="emoji">🤚</div>
                    <div>Carregando...</div>
                </Components.ScreenWarning>
              }
              {!loading && photos.length > 0 &&
                  <Components.PhotoList>
                      {photos.map((item, index) => (
                        <PhotoItem
                            key={index}
                            url={item.url}
                            name={item.name}
                            onDelete={handleDeleteClick}
                        />
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
