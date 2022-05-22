import React from 'react';

export default function Icon({ icon }: { icon: MaterialIcon }): JSX.Element {
    return (
        <span className="icon">
            {icon}
        </span>
    )
}