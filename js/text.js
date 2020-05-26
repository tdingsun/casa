var volume = new Tone.Volume(-12);
var synth = new Tone.PolySynth(7, Tone.Synth).chain(volume, Tone.Master);

var notes = Tone.Frequency("G2").harmonize([0, 3, 7, 10, 12, 15, 19, 22, 24]);
var noteID = 0;

$("canvas").on('mousedown', function(){
    $('#moreinfo').hide();
    $("#moreinfo-btn").text("?");
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