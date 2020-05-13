const {axios} = require("./fakeBackend/mock");

const getFeedbackByProductViewData = async (product, actualize = false) => {
    return axios.get(`/feedback?product=${product}`)
        .then(({data}) => {
            const {feedback} = data;
            if (feedback && feedback.length) {
                let result = {};
                const userIds = feedback.map(feedback => feedback.userId);
                return axios.get('/users', {
                    params: {
                        ids: userIds
                    }
                }).then(({data}) => {
                    const {users} = data;
                    let temp = feedback;
                    if (actualize) {
                        temp = temp.sort((a, b) => b.date - a.date).filter((item, index, self) => {
                            return self.findIndex(f => f.userId === item.userId) === index;
                        });
                    }
                    const sorted = temp.sort((a, b) => a.date - b.date);
                    result.feedback = sorted.map(item => {
                        let user = users.find(user => user.id === item.userId);
                        let date = new Date(item.date);
                        return {
                            user: `${user.name} (${user.email})`,
                            message: item.message,
                            date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
                        }
                    });

                    return result;
                });
            } else {
                return {
                    message: "Отзывов пока нет"
                };
            }
        })
        .catch(error => {
            if (error.response.status === 404) {
                return error.response.data;
            }
        });
};

module.exports = {getFeedbackByProductViewData};
