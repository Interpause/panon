import org.kde.plasma.core 2.0 as PlasmaCore
import "utils.js" as Utils
/*
 * Create virtual environment for auto-installing dependencies.
 */
PlasmaCore.DataSource {
    engine: 'executable'
    property bool isCreated: false
    readonly property string createVenv:Utils.create_venv()
    connectedSources: [createVenv]
    onNewData:{
        // Show back-end errors.
        console.log(data.stdout)
        console.log(data.stderr)
        if(!isCreated && data.stdout.includes('venv_created')){
            isCreated = true
            console.log('Venv Created!')
        }
    }
}
