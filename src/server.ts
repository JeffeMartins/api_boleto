import 'dotenv/config';
import {app} from './app';

const port = process.env.PORT || 3003;

app.listen(port, () => {
    console.log(`Server starting on port ${port}`)
})
