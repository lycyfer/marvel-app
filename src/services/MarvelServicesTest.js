class MarvelServices {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=4ff7928268970e67e6c891ead910f22a';
    _baseOffset = 210;

    getResource = async (url) => {

        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not find ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacters);
    }




    getCharacters = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)
        return this._transformCharacters(res.data.results[0]);
    }

    _transformCharacters = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'not found description',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items


        }
    }

}



export default MarvelServices;