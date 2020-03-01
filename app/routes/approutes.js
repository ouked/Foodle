module.exports = function(app) {
    const appController = require('../controller/appController.js');

    app.route('/posts')
        .get(appController.list_all_posts)
        .post(appController.create_a_post);

    app.route('/posts/:postID')
        .get(appController.read_a_post)
        .put(appController.update_a_post)
        .delete(appController.delete_a_post);

    app.route('/users')
        //.get(appController.list_all_users)
        .post(appController.create_a_user);

    app.route('/users/:userID')
        .get(appController.read_a_user)
        .put(appController.update_a_user)
        .delete(appController.delete_a_user);
};
