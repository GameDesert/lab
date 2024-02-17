//create a synth and connect it to the main output (your speakers)
const synth = new Tone.Synth().toDestination();
const beat = new Tone.NoiseSynth().toDestination();
const now = Tone.now()

synth.context.resume()

function playNote() {
    Tone.start()
    synth.triggerAttackRelease("C4", "8n", now)
    synth.triggerAttackRelease("E4", "2n", now + 0.5)
    synth.triggerAttackRelease("G4", "4n", now + 1)
    synth.triggerAttackRelease("G4", "4n", now + 2)
    synth.triggerAttackRelease("G4", "16n", now + 3)
    synth.triggerAttackRelease("G4", "8n", now + 4)
}