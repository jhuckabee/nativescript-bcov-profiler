import { View } from "ui/core/view";
import { Subject } from "rxjs/Subject";
import { Property } from "ui/core/dependency-observable";
export declare module com {
    module brightcove {
        module player {
            module event {
                const EventType: any;
                class EventListener {
                    constructor();
                    constructor(any: any);
                }
            }
            module media {
                const DeliveryType: any;
            }
            module model {
                class Video {
                    static createVideo(url: string, deliveryType: any): any;
                }
            }
            module view {
                class BrightcovePlayerFragment extends android.app.Fragment {
                    fullScreen(): void;
                }
                module media {
                    const DeliveryType: any;
                }
            }
        }
    }
}
export declare class BrightcovePlayer extends View {
    eventStream: Subject<any>;
    currentTime: number;
    private _android;
    private frameLayout;
    private fragment;
    static videoIdProperty: Property;
    constructor();
    videoId: any;
    readonly android: any;
    readonly _nativeView: any;
    play(): void;
    pause(): void;
    seekToTime(seconds: number, onFinished?: (finished: any) => any): void;
    onLoaded(): void;
    loadVideo(): void;
    _createUI(): void;
    private _clearAndroidReference();
}
export declare class PlayerFragment extends com.brightcove.player.view.BrightcovePlayerFragment {
    videoId: string;
    video: any;
    layout: any;
    brightcoveVideoView: any;
    eventStream: Subject<any>;
    onCreateView(inflater: any, container: any, savedInstanceState: any): any;
    loadVideo(): void;
}
