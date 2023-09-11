import { useControls, button } from 'leva'

export default function Button() {
    const values = useControls({
        number: 3,
        'Exit Room!': button((get) => {
            const result = window.confirm('Are you sure to exit XR Room?');
            if (result) {
                if (window.opener) {
                    // window.opener.location.href = '/tab-a';
                    window.close(); // Close tab B
                }
                console.log('User confirmed');
            } else {
                // User clicked "Cancel" or "No"
                // Handle the cancellation here
                console.log('User cancelled');
            }
        }),
    })

    return (
        <div>
            <pre>{JSON.stringify(values, null, '  ')}</pre>
        </div>
    )
}