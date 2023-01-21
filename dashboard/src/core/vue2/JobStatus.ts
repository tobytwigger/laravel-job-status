import {defineComponent, h} from 'vue';
import {AssociativeObject, ComponentData, DefaultProps} from '~/types/core';
import JobStatusObserver from '~/core/JobStatusObserver';
import JobStatusClient from '~/core/JobStatusClient';

export default defineComponent({
    render() {
        if (this.$scopedSlots.hasOwnProperty('loading') && this.loading && this.status === null) {
            // @ts-ignore
            return h('div', this.$scopedSlots.loading({initialLoad: this.initialLoad}));
        }
        if (this.error && this.$scopedSlots.hasOwnProperty('error')) {
            // @ts-ignore
            return h('div', this.$scopedSlots.error({message: this.error}));
        }
        if (this.status === null && this.$scopedSlots.hasOwnProperty('empty')) {
            // @ts-ignore
            return h('div', this.$scopedSlots.empty({loading: this.loading, initialLoad: this.initialLoad}));
        }
        if (this.$scopedSlots.hasOwnProperty('default')) {
            // @ts-ignore
            return h('div', this.$scopedSlots.default(this.defaultSlotProperties));
        }
        return h('div', 'Please define a default slot to see the job status.');
    },
    props: {
        jobAlias: {
            type: String,
            required: true,
        },
        tags: {
            type: Object,
            required: false,
            default: () => {
                return {};
            },
        },
        method: {
            type: String,
            required: false,
            validator: (val) => val === 'polling',
            default: 'polling',
        },
        pollInterval: {
            type: Number,
            required: false,
            default: 5000,
        }
    },
    mounted() {
        this.setUpObserver();
    },
    destroyed() {
        this.jobStatusObserver?.cleanup();
    },
    data(): ComponentData {
        return {
            status: null,
            loading: false,
            initialLoad: false,
            statusId: null,
            error: null,
            jobStatusObserver: null,
        };
    },
    methods: {
        setUpObserver() {
            this.initialLoad = true;
            if (this.jobStatusObserver !== null) {
                this.jobStatusObserver.cleanup();
            }
            this.jobStatusObserver = new JobStatusObserver(this.jobAlias, this.tags);
            if (this.method === 'polling') {
                this.jobStatusObserver
                    .poll(this.pollInterval)
                    .onUpdated((jobStatus) => {
                        this.status = jobStatus;
                        this.error = null;
                    })
                    .onError((error) => (this.error = error.message))
                    .onLoading(() => (this.loading = true))
                    .onFinishedLoading(() => {
                        this.loading = false;
                        this.initialLoad = false;
                    });
                this.jobStatusObserver.update();
            }
        },
        cancel() {
            return this.signal('cancel', true);
        },
        signal(signal: string, cancelJob: boolean = false, parameters: AssociativeObject = {}): Promise<null> | null {
            if (this.status === null) {
                return null;
            }
            return JobStatusClient.getInstance().sendSignal(this.status.id, signal, cancelJob, parameters);
        },
    },
    computed: {
        defaultSlotProperties(): DefaultProps | null {
            if (this.status !== null) {
                return {
                    status: this.status.status,
                    lastMessage: this.status.lastMessage,
                    complete: this.status.isFinished,
                    percentage: this.status.percentage,
                    cancel: () => this.cancel(),
                    signal: (signal: string, cancelJob: boolean, parameters: AssociativeObject) =>
                        this.signal(signal, cancelJob, parameters),
                };
            }
            return null;
        },
    },
});
