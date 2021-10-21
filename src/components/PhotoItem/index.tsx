import * as Components from './syles';

type Props = {
    url: string;
    name: string;
}

export const PhotoItem = ({ url, name }: Props) => {
    return (
        <Components.Container>
            <img src={url} alt={name} />
            {name}
        </Components.Container>
    );
}
