const {axios} = require("./fakeBackend/mock");

const getFeedbackByProductViewData = async (product, actualize = false) => {
    return axios.get(`/feedback?product=${product}`)
        .then(({data}) => {
            if (data.feedback && data.feedback.length) {

                const userIds = feedback.map(feedback => feedback.userId)
                console.log(userIds)

                axios.get('/users', {
                    params: {
                        ids: userIds
                    }
                }).then(({data}) => {
                    console.log(data)
                });

                return {
                    feedback: data.feedback
                };

                // {
                //     "feedback": [
                //     {
                //         "user": "Марк Визельман (weazelman@gmail.com)",
                //         "message": "",
                //         "date": "2019-2-14"
                //     },
                //     {
                //         "user": "Кирилл Давсон (kdawson@gmail.com)",
                //         "message": "Пока сырой продукт",
                //         "date": "2019-3-3"
                //     },
                //     {
                //         "user": "Виктор Ганеш (vganesh@outlook.com)",
                //         "message": "",
                //         "date": "2019-3-4"
                //     }
                // ]
                // }

            } else {
                return {
                    "message": "Отзывов пока нет"
                }
            }

        })
};

module.exports = {getFeedbackByProductViewData};
