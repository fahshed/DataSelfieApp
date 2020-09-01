function setup() {
    noCanvas();
    const video = createCapture(VIDEO);
    video.size(320, 240);
    let lat, lon;
    const button = document.getElementById('submit');
    button.addEventListener('click', async (event) => {
        const mood = document.getElementById('mood').value;
        video.loadPixels();
        const image64 = video.canvas.toDataURL();
        const data = { lat, lon, mood, image64 };
        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        const response = await fetch('/api', options);
        const json = await response.json();
        console.log(json);
    })

    if('geolocation' in navigator) {
        console.log('Geolocation Available');
        
        navigator.geolocation.getCurrentPosition((position) => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            //console.log(lat, lon);
            document.getElementById('latitude').textContent = lat;
            document.getElementById('longitude').textContent = lon;
        });
    } 
    else {
        console.log('Geolocation not Available');
    }
}