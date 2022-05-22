type ColumnCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type Justification = 'center' | 'right' | 'left' | 'between' | 'around' | 'evenly';
type Direction = 'vertical' | 'horizontal';
type Alignment = 'center' | 'top' | 'bottom';
interface NavItem {
    name: string,
    url: string,
}
interface FullName {
    firstname?: string,
    lastname?: string
}
type Theme = 'dark' | 'light';
type StorageItem = string|number|boolean|object|undefined;
type MaterialIcon = 'menu' | 'close' | 'dark_mode' | 'light_mode' | 'warning' | 'error' | 'check_circle_outline' | 'account_circle' | 'announcement' | 'rocket_launch' | 'arrow_back' | 'save';

type Status = 'loading' | 'warning' | 'error' | 'success' | undefined;

interface RequestProps {
    uri?:string,
    method?:'GET' | 'POST' | 'PUT' | 'DELETE',
    body?:BodyInit | null | undefined,
    onSuccess?:Function,
    onError?:Function,
    onLoading?:Function
}

interface UserResponse {
    name:string
}
type Display = 'block' | 'none';

interface AlertDialogue {
    title?:string,
    action:Function<void>,
    actionLabel?:string,
    content?:JSX.Element,
    status?:Status,
    onCancel?:Function<void>,
    onComplete?:Function<void>

}

interface AlertProps {
    title?:string,
    action:Function<void>,
    actionLabel?:string,
    content?:JSX.Element,
    status:Status,
    onCancel?:Function<void>,
    toggle:boolean,
    onComplete?:Function<void>
}
type UseGuestureEvent = Omit<FullGestureState<"scroll">, "event"> & { event: UIEvent; }

interface AttentionProps {
    visible:boolean,
    child:ComponentType<any>
}

type Bookmark = {
    id?:string,
    url:string,
    image:string,
    created?:string,
    title:string,
    description?:string,
    onSave?:Function
}
type DataParams = {
    category?: string,
    search?:string
}