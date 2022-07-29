cube(`Orders`, {
    sql: `SELECT * FROM public.orders`,

    measures: {
        count: {
            type: `count`,
        },

        count2: {
            type: `count`,
        },
    },

    dimensions: {
        id: {
            sql: `id`,
            type: `number`,
            primaryKey: true,
        },

        status: {
            sql: `status`,
            type: `string`,
        },

        userId: {
            sql: `user_id`,
            type: `number`,
        },

        completedAt: {
            sql: `completed_at`,
            type: `time`,
        },
    },

    preAggregations: {
        ordersByCompletedAt: {
            unionWithSourceData: true,
            measures: [count, sum],
            dimensions: [status, userId],
            timeDimension: completedAt,
            granularity: `day`,
            partitionGranularity: `month`,
            buildRangeStart: {
                sql: `SELECT DATE('2020-02-7')`,
            },
            buildRangeEnd: {
                sql: `SELECT DATE('2020-06-7')`,
            },
            refreshKey: {
                every: 'never',
            },
        },
    },
});
