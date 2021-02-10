//getting search result for songs search
const searchSongs = async () => {
    const searchText = document.getElementById('search-field').value;
    document.getElementById('songs-container').innerHTML = '';
    document.getElementById('song-lyrics').innerHTML = '';
    document.getElementById('error-message').innerHTML = '';
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    try {
        const response = await fetch(url);
        const data = await response.json();
        displaySongs(data.data);
    }
    //displaying error when songs cant load
    catch (error) {
        displayError('There is some issues to load the song')
    }
}

//function for showing matching songs against user's search input
const displaySongs = songs => {
    const songsContainer = document.getElementById('songs-container');
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/ogg">
                
            </audio>
        </div>
            <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>`;
        songsContainer.appendChild(songDiv);
    });
    document.getElementById('search-field').value = '';
}

//function for handling lyrics button of selected song
const getLyric = async (artist, title) => {
    document.getElementById('error-message').innerHTML = '';
    document.getElementById('song-lyrics').innerHTML = '';
    const url = `https://api.lyrics.ovh/v1/${artist}}/${title}`
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayLyrics(data.lyrics);
    }
    //displaying error when lyrics cant load
    catch (error) {
        displayError('There is some issues to load lyrics');
    }
}

//function for displaying lyrics
const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics');

    if (lyrics != "") {
        lyricsDiv.innerText = lyrics;
    }
    //displaying error when lyrics not found
    else {
        displayError('Sorry! Lyrics is not found');
    }
}

//function for displaying error
const displayError = error => {
    const errorDiv = document.getElementById('error-message');
    errorDiv.innerHTML = `
    <h3>${error}</h3>`;
    document.getElementById('search-field').value = '';
}