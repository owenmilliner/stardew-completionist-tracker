const Instructions = () => {
    return (
        <div className='instructions'>
            <div className='instructions__overview instructions__panel'>
                <h2>How it works.</h2>
                <p>This is a placeholder description. This will include data on:</p>
                <ul>
                    <li className='instructions__overview__list'>
                        Uploading save file / manual input
                    </li>
                    <li>
                        Simple display of incomplete criteria (sortable by season, etc)
                    </li>
                </ul>
            </div>
            <div className='instructions__start instructions__panel'>
                <h2>Uploading a save file.</h2>
                <p>To automatically detect your Stardew progress, upload your save file here!</p>
                <p>Depending on your operating system, the file is typically located at:</p>
                <ul id="instructions__start__list">
                    <li>
                        Windows: <strong>%AppData%/Roaming/StardewValley/Saves/</strong>
                    </li>
                    <li>
                        Mac/Linux: <strong>~/.config/StardewValley/Saves/</strong>
                    </li>
                </ul>
                <p>This file will have a name similar to: <strong>farmName_123456789</strong></p>
                
                <form>
                    <label for="file-upload" class="instructions__start__input">
                        📄 File Upload
                    </label>
                    <input id="file-upload" type="file"/>

                </form>

                <h2>Manual input.</h2>
                <p>Placeholder for instructions.</p>
            </div>
            <div className='instructions__resources instructions__panel'>
                <h2>Additional useful resources.</h2>
                <p>Placeholder for description.</p>
            </div>
        </div>
    )
};

export default Instructions;