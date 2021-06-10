const express = require('express');
const { Schema } = require('mongoose');
const multer = require('multer');
const app = express();
const morgan = require('morgan');
const session = require('express-session');

app.use(session({secret: 'secret tsss', saveUninitialized: false, resave: false}));

app.use(express.urlencoded({extended: true}));

let path = require('path');
app.use(morgan('dev'));
const mongoose = require('mongoose');

app.use(express.static(__dirname));

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '/photo')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({storage: storage, fileFilter: fileFilter});


//Models
const Attendance = require('./models/Attendance');
const Group = require('./models/Group');
const Order = require('./models/Order');
const Service = require('./models/Service');
const Well = require('./models/Well');
const Worker = require('./models/Worker');
const { group } = require('console');





//GET

app.get('/', (req,res) => {
    return res.send('Hello');
})

app.get('/is', (req, res) => {
    console.log('Текущий пользователь: ' + req.session.user);
    return res.json(req.session.user);
});

app.get('/logout', (req, res) => {
    req.session.user = null;
    console.log('Текущий пользователь: ' + req.session.user);
    res.json(req.session.user);
})

app.get('/worker', async (req, res) => {
    const workers =  await Worker.find({}, (err, data) => {
        if (err) return res.send(err);
        if (data.length === 0) {
            console.log('Empty wokers');
            return res.send('Empty wokers');
        };
    });

    return res.json(workers);
});

app.get('/group', async (req, res) => {
    const groups =  await Group.find({}, (err, data) => {
        if (err) return res.send(err);
        if (data.length === 0) {
            console.log('Empty group');
            return res.send('Empty group');
        };
    });

    return res.json(groups);
});

app.get('/service', async (req, res) => {
    const services =  await Service.find({}, (err, data) => {
        if (err) return res.send(err);
        if (data.length === 0) {
            console.log('Empty services');
            return res.send('Empty services');
        };
    });

    return res.json(services);
});

app.get('/well', async (req, res) => {
    const wells =  await Well.find({}, (err, data) => {
        if (err) return res.send(err);
        if (data.length === 0) {
            console.log('Empty wells');
            return res.send('Empty wells');
        };
    });

    return res.json(wells);
});

app.get('/order', async (req, res) => {
    const orders =  await Order.find({}, (err, data) => {
        if (err) return res.send(err);
        if (data.length === 0) {
            console.log('Empty orders');
            return res.send('Empty orders');
        };
    });

    return res.json(orders);
});

app.get('/attendance', async (req, res) => {
    const attendances =  await Attendance.find({}, (err, data) => {
        if (err) return res.send(err);
        if (data.length === 0) {
            console.log('Empty attendances');
            return res.send('Empty attendances');
        };
    });

    return res.json(attendances);
});

//POST

app.post('/login', async (req, res) => {
    console.log(req.body);
    Worker.findOne({login: req.body.login, pass: req.body.pass}, (err, data) => {
        console.log(data);
        req.session.user = data
        return res.json(data);
    });

});


app.post('/worker', upload.single('photo') ,async (req, res) => {
    console.log(req.file);
    const worker = new Worker({
        surname: req.body.surname,
        name: req.body.name,
        middle_name: req.body.middle_name,
        login: req.body.login,
        pass: req.body.pass,
        birth: req.body.birth,
        photo: req.file.filename,
        status: req.body.status,
        position: req.body.position
    });
    worker.save();
    return res.json(worker);
});

app.post('/group',async (req, res) => {
    const group = new Group({
        name: req.body.name,
        master: req.body.master,
        workers: req.body.workers
    });
    group.save();
    return res.json(group);
});

app.post('/service',async (req, res) => {
    const service = new Service({
        name: req.body.name,
        price: req.body.price
    });
    service.save();
    return res.json(service);
});

app.post('/well', upload.single('photo'), async (req, res) => {
    const well = new Well({
        status: req.body.status,
        type_well: req.body.type_well,
        name: req.body.name,
        location: req.body.location,
        photo: req.file.filename
    });
    well.save();
    return res.json(well);
});

app.post('/order',async (req, res) => {
    const order = new Order({
        service: req.body.service,
        well: req.body.well,
        group: req.body.group,
        status: req.body.status,
        start: req.body.start,
        end: req.body.end
    });
    order.save();
    return res.json(order);
});

app.post('/attendance',async (req, res) => {
    const attendance = new Attendance({
        date: req.body.date,
        worker: req.body.worker,
        time_start: req.body.time_start,
        time_end: req.body.time_end
    });
    attendance.save();
    return res.json(attendance);
});

//DELETE

app.delete('/worker/:id', async (req, res) => {
    const worker = await Worker.deleteOne({_id: mongoose.Types.ObjectId(req.params.id)});
    return res.json(worker);
});

app.delete('/group/:id', async (req, res) => {
    const group = await Group.deleteOne({_id: mongoose.Types.ObjectId(req.params.id)});
    return res.json(group);
});

app.delete('/service/:id', async (req, res) => {
    const service = await Service.deleteOne({_id: mongoose.Types.ObjectId(req.params.id)});
    return res.json(service);
});

app.delete('/well/:id', async (req, res) => {
    const well = await Well.deleteOne({_id: mongoose.Types.ObjectId(req.params.id)});
    return res.json(well);
});

app.delete('/order/:id', async (req, res) => {
    const order = await Order.deleteOne({_id: mongoose.Types.ObjectId(req.params.id)});
    return res.json(order);
});

app.delete('/attendance/:id', async (req, res) => {
    const attendance = await Attendance.deleteOne({_id: mongoose.Types.ObjectId(req.params.id)});
    return res.json(attendance);
});

//UPDATE

app.put('/worker/:id', upload.single('photo') ,async (req, res) => {
    await Worker.updateOne({_id: mongoose.Types.ObjectId(req.params.id)}, {
        surname: req.body.surname,
        name: req.body.name,
        middle_name: req.body.middle_name,
        login: req.body.login,
        pass: req.body.pass,
        birth: req.body.birth,
        photo: req.body.photo,
        status: req.body.status,
        position: req.body.position
    });

    return res.send('ok');

});

app.put('/group/:id',async (req, res) => {
    await Group.updateOne({_id: mongoose.Types.ObjectId(req.params.id)}, {
        name: req.body.name,
        master: req.body.master,
        workers: req.body.workers
    });

    return res.send('ok worker');
});

app.put('/service/:id',async (req, res) => {
    await Service.updateOne({_id: mongoose.Types.ObjectId(req.params.id)}, {
        name: req.body.name,
        price: req.body.price
    });

    return res.send('ok service');
});

app.put('/well/:id', upload.single('photo'), async (req, res) => {
    await Well.updateOne({_id: mongoose.Types.ObjectId(req.params.id)}, {
        status: req.body.status,
        type_well: req.body.type_well,
        name: req.body.name,
        location: req.body.location,
        photo: req.file.filename
    });

    return res.send('ok well');
});

app.put('/order/:id',async (req, res) => {
    await Order.updateOne({_id: mongoose.Types.ObjectId(req.params.id)}, {
        service: req.body.service,
        well: req.body.well,
        group: req.body.group,
        status: req.body.status,
        start: req.body.start,
        end: req.body.end
    });

    return res.send('ok order');
});

app.put('/attendance/:id',async (req, res) => {
    await Attendance.updateOne({_id: mongoose.Types.ObjectId(req.params.id)}, {
        date: req.body.date,
        worker: req.body.worker,
        time_start: req.body.time_start,
        time_end: req.body.time_end
    });

    return res.send('ok attendance');
});

//APP RUNNING WITH CONNECT DATABASE

mongoose.connect('mongodb+srv://Heliostat:mongoColl@cluster0.vder1.mongodb.net/oil?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if (err) return console.log("Ошибка подключения");
    console.log('Всё нормально');
    app.listen(3000);
})
