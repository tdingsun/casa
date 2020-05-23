const text = `This was the only memory I had of my mother. One day that I did not have classes at school, she took me to her work at a hospital in the Anzures neighborhood. It was a long day but when she finished we went to the Bosque de Chapultepec and after walking for a while we sat on a bench to eat ice cream. In front of us was a medium-sized statue. It was sculpted from a single stone and had a particular feature: its surface was covered with thorns like a ceiba tree. It had a bit of moss and gathered dried leaves around it. I walked over the statue and hugged it carefully. I felt the humidity that stones have, and little by little I put pressure with the thorns over my body. I remember identifying that vertigo to pain that is now so familiar to me. My mother knew the history of the monument. It was in honor of Rosa Espino, an imaginary poet who served as a pseudonym to the Porfirista general Vicente Riva Palacio to write love poems. In addition to leading the center's army, Riva Palacio was a prolific historian of violence in Mexico, founder of the opposition newspaper El Ahuizote, and creator of the popular song Adios Mama Carlota. He was both a hero of the resistance against the French and a satirical politician. It made sense to honor a man who had risked his life so many times for the country and whose cultural efforts had been extraordinary. But he was also a tragic character. A 19th century general with presidential ambitions could not be a poet. Ecstasy doesn't get along with politics. It was through an invented woman that the general was able to express his intimacy. At that time, very few women had access to the world of letters, but Rosa Espino had exceptional success. She has fans that loved her and convinced the most renowned critics of her existence. Only a woman could write such gentle and charming verses. The thorned monument was unsolved: it was a monument to a suspended will. The general had been everything but what he wanted to be. He could not be president for wanting to be a poet and he could not be a poet for wanting to be president. As Lerdo de Tejada, his most consistent political enemy, warned him: "between strength and weakness is the desert." I entered the forest knowing where to go. La Calzada de los Poetas is a hidden spot where you get lost a few times to get there. It is a path marked by high ahuehuetes and next to a small lake. Along the way, busts of some of the most representative poets of Mexico in the 19th and 20th centuries are erected. I walked the pathway containing the anticipated emotion of returning to my childhood, carefully observing each of the sculptures. They were battered and sometimes the metal letters with the names of the poets and fragments of their works had felt. "You are more my eyes because you see what in my eyes I carry from your life" I was able to read from the Carlos Pellicer monument. At the end of the road, I found one last sculpture. Unlike the others, it had a base covered with quarry tiles. It was from José Guadalupe Posada, an illustrious engraver guest among the writers. I searched desperately for the monument of my memory without success. Of the twelve sculptures the only woman was that of Sor Juana Inés de la Cruz and none had thorns. I took out my cell phone as a reflection in a duel. Muscle memory did not fail me. The monument had to be nearby and Google Maps was going to prove it. What was I doing wandering in a forest adrift of a confused memory? On the map La Calzada was announced by red lines with icons on the sides that indicate the location of the monuments. I enlarged the area with my fingers and noticed that not all the statues of the poets were registered. Of those that were, Sor Juana's was the most photographed. I read the review of someone who attended a read aloud of her poem, Primero Sueño in front of the statue. I looked for clues as if I was the protagonist thay excavates the internet in a 90s movie. Inside the page of the monument to Manuel Acuña there was an image that was different from the rest. It was the photo of a woman posing as a ballet dancer with half her body tucked in the center of a hollow ahuehuete of those around La Calzada. The statue did not even appear. How could someone put their personal photos there? How had it been accepted by Google? How to find the monument under such low quality standard? I convinced myself that it was imperative to correct such a degree of selfishness and reported the image on the platform. In the text field to give reason for the report, I wrote: "The cheesiness of this image is an insult to Manuel Acuña, the poet who drank cyanide because he was in love." In its early days, Google Maps allowed anyone to contribute to the construction of their maps by editing information, adding reviews, and photographing locations. But over the years these possibilities have been limited. And while suggestions are still possible, the approval process is much more demanding. There is now a point system and a community of amateur “guides” who monitor the accuracy of the information on the maps through Google Local Guides. Doing an evaluation grants one point, uploading a photograph gives you five points and making a review, ten points. Reviews with more than 200 letters give an extra bonus of ten points. Adding a place successfully adds fifteen points, which is the highest score for a single action. Points translate into levels and give users exclusive access to components and benefits on the platform. Fifteen thousand points earn you a medal as a "Master Photographer" and having made more than one hundred approved suggestions, one hundred verifications and answering a thousand questions gives you the title of "Master Fact Finder". The last level requires more than 100,000 points. It’s a perfect system of unpaid labor. Although Google makes it seem like a game, making maps is a political act. Any attempt to represent a space will be imprecise and therefore negotiable. It seems that the control over spaces no longer depends so much on physical borders, but on the authority that is exercised over their descriptions: over the maps that regulate and legitimize them. Google, for example, modifies the boundaries between countries depending on which country you are in when you look at their maps, allowing different political realities simultaneously. Digital maps are colonized spaces within the order of the data and the operating logics of digital platforms. I returned to the forest during the following days. In the third section, I found a sculpture in honor of Alfonso Reyes that had been inaugurated in 1975. I visited the sculptures of black lionesses that perch on prickly pear plants. I looked at a fountain with the figure of two lovers in rusty green bronze. And the sculpture of Don Quixote seemed disproportionately small to the landscape. During one of my tours, I was surprised by a huge ahuehuete tree about fifteen meters high delimited by a circular planter. It was dry and like a vegetable monument to the grandeur of these sacred trees. Searching online I found out that it lived about five hundred years and dried up in the sixties. The cadets of the Military College nicknamed him El Sargento. Nowhere was the monument to Rosa Espino or traces of it on the internet. It was possible that it had been removed or that it was somewhere else covered in plants and forgotten. I didn't want to think that it didn't exist. But I couldn't keep looking. When my brain questions a memory it's a matter of time before I lose it. Thoughts overlap disoriented until they cloud my mind. There is only a feeling of an anxious emptiness that cannot be filled. It is like having a thousand words on the tip of your tongue. I had to act fast, I was not going to forget my mother. I thought about breaking my own rules and adding the monument to the map. Would it be possible to add a monument that does not exist to Google Maps? Could I infiltrate my memory into this supposedly objective tool? I thought about the photo of the dancer and regretted having reported it. Who was I to edit the memories of a stranger? It was clear to me that Google Maps was not perfect. I had heard before of the heroic case of a level 9 reviewer - with more than 50,000 points - that without being noticed by Google, he added in Photoshop images of UFOs in the skies of the photos that accompanied his reviews. My memory could also go unnoticed. The digital monument would be a secret hidden in plain sight. I would have a place to return and remember my childhood from anywhere in the world.`;

const text_array = text.split(" ");
const divW = 200;
const divH = 100;
var t;
var numBoxes = 0;
var c = 0;
var speed = 500;

var volume = new Tone.Volume(-24);
var synth = new Tone.PolySynth(7, Tone.Synth).chain(volume, Tone.Master);

var notes = Tone.Frequency("C2").harmonize([0, 3, 7, 10, 12, 15, 19, 22, 24]);
var noteID = 0;
// var player = new Tone.Player("./audio.mp3").toMaster();

// StartAudioContext(Tone.context, window);  
// $('#play-btn').click(function(){
//     if(player.loaded){
//         Tone.context.resume();
//         player.start();
//         // setTimeout(() => {
//         //     t = setTimeout(displayText, speed);
//         // }, 4000);
//         $('#play-btn').hide();
//     }

// });


$("canvas").on('mousedown', function(){
    $('#moreinfo').hide();
    synth.triggerAttackRelease(notes[noteID], "2m");
    noteID++;
    if(noteID > notes.length) noteID = 0;
});
var keydown = false;
$("canvas").on('keydown', function(){
    if(!keydown){
        keydown = true;
        let noteID = Math.floor(Math.random() * notes.length);
        synth.triggerAttackRelease(notes[noteID], "2m");
    }
});

$("canvas").on('keyup', function(){
    keydown = false;
})

$('#moreinfo-btn').click(function(){
    $('#moreinfo').toggle();
    $("#moreinfo-btn").text( $("#moreinfo-btn").text() == "✕" ? "?" : "✕");
});

$('#title-container').click(function(){
    $('#moreinfo').hide();
    $("#moreinfo-btn").text("?");
});